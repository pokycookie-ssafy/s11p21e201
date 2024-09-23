package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.repository.company.EmployeeRepository;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class EmployeeService extends BaseEntity {

	private final EmployeeRepository employeeRepository;
	private final DepartmentService departmentService;
	private final OneWayCipherService oneWayCipherService;

	@JtaTransactional
	public EmployeeCreateResponse create(EmployeeCreateRequest request) {
		Department department = departmentService.findEntity(request.getDepartmentId());
		Employee employee = request.toEntity(department);
		encryptPassword(employee);
		Employee savedEmployee = employeeRepository.save(employee);
		return new EmployeeCreateResponse(savedEmployee.getId());
	}

	public AuthInfo checkPassword(EmployeeAuthRequest request) {
		Employee employee = employeeRepository.findByCode(request.getCode())
			.orElseThrow(() -> new RuntimeException("not found employee"));
		validatePassword(request, employee);
		return new AuthInfo(employee.getId(), RoleType.EMPLOYEE);
	}

	public Employee findEntity(UUID id) {
		return employeeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	private void encryptPassword(Employee employee) {
		String encryptedPassword = oneWayCipherService.encrypt(employee.getPassword());
		employee.changePassword(encryptedPassword);
	}

	private void validatePassword(EmployeeAuthRequest request, Employee employee) {
		if (!oneWayCipherService.match(request.getPassword(), employee.getPassword())) {
			throw new RuntimeException("wrong password");
		}
	}
}
