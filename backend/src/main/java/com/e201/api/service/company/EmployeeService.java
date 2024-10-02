package com.e201.api.service.company;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.controller.company.response.employee.EmployeeFindResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.EmployeeRepository;
import com.e201.global.exception.EntityNotFoundException;
import com.e201.global.exception.PasswordIncorrectException;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class EmployeeService extends BaseEntity {

	private final ManagerService managerService;
	private final EmployeeRepository employeeRepository;
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
		return new AuthInfo(employee.getId(), RoleType.EMPLOYEE);
	}

	public Employee findEntity(UUID id) {
		return employeeRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EMPLOYEE.name()));
	}

	public Page<EmployeeFindResponse> findPage(UUID departmentId, Pageable pageable) {
		return employeeRepository.findPage(departmentId, pageable).map(EmployeeFindResponse::of);
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
