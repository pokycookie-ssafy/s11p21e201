package com.e201.api.service.company;

import static com.e201.global.exception.ErrorCode.*;
import static com.e201.global.security.auth.constant.RoleType.*;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.request.employee.EmployeeUsageRequest;
import com.e201.api.controller.company.response.employee.EmployeeAuthResponse;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.controller.company.response.employee.EmployeeFindResponse;
import com.e201.api.controller.company.response.employee.EmployeeUsageResponse;
import com.e201.api.service.payment.PaymentService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.EmployeeRepository;
import com.e201.global.exception.EntityNotFoundException;
import com.e201.global.exception.PasswordIncorrectException;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.exception.AuthorizationException;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class EmployeeService extends BaseEntity {

	private final ManagerService managerService;
	private final EmployeeRepository employeeRepository;
	private final PaymentService paymentService;
	private final OneWayCipherService oneWayCipherService;

	@JtaTransactional
	public EmployeeCreateResponse create(EmployeeCreateRequest request, UUID managerId) {
		Manager manager = managerService.findEntity(managerId);
		Department department = manager.getDepartment();
		Employee employee = request.toEntity(department);
		encryptPassword(employee);
		Employee savedEmployee = employeeRepository.save(employee);
		return new EmployeeCreateResponse(savedEmployee.getId());
	}

	public AuthInfo checkPassword(EmployeeAuthRequest request) {
		Employee employee = employeeRepository.findByCode(request.getCode())
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EMPLOYEE.name()));
		validatePassword(request, employee);
		return new AuthInfo(employee.getId(), EMPLOYEE);
	}

	public Employee findEntity(UUID id) {
		return employeeRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EMPLOYEE.name()));
	}

	public EmployeeAuthResponse findAuth(UUID id) {
		Employee employee = findEntity(id);
		return EmployeeAuthResponse.builder()
			.employeeId(id)
			.employeeName(employee.getName())
			.departmentId(employee.getDepartment().getId())
			.departmentName(employee.getDepartment().getName())
			.build();
	}

	public List<EmployeeFindResponse> findAll(AuthInfo authInfo) {
		validateAuthorization(authInfo);
		UUID companyId = authInfo.getRoleType().equals(COMPANY) ? authInfo.getId() : null;
		UUID departmentId = authInfo.getRoleType().equals(MANAGER) ?
			managerService.findEntity(authInfo.getId()).getDepartment().getId() : null;

		return employeeRepository.findAllByDepartmentId(companyId, departmentId)
			.stream()
			.map(EmployeeFindResponse::of)
			.toList();
	}

	public EmployeeUsageResponse findUsage(AuthInfo authInfo, EmployeeUsageRequest request) {
		UUID employeeId = authInfo.getId();
		Employee employee = findEntity(employeeId);
		Long usage = paymentService.findUsageByEmployee(employeeId, request.getStartDate(), request.getEndDate());
		return EmployeeUsageResponse
			.builder()
			.supportAmount(employee.getSupportAmount())
			.usage(usage)
			.build();
	}

	private void validateAuthorization(AuthInfo authInfo) {
		if (!(authInfo.getRoleType().equals(COMPANY) || authInfo.getRoleType().equals(MANAGER))) {
			throw new AuthorizationException(AUTHORIZATION_FAILED, "직원 목록 조회에 권한이 없음");
		}
	}

	private void encryptPassword(Employee employee) {
		String encryptedPassword = oneWayCipherService.encrypt(employee.getPassword());
		employee.changePassword(encryptedPassword);
	}

	private void validatePassword(EmployeeAuthRequest request, Employee employee) {
		if (!oneWayCipherService.match(request.getPassword(), employee.getPassword())) {
			throw new PasswordIncorrectException(AUTHENTICATION_FAILED, EMPLOYEE.name());
		}
	}
}
