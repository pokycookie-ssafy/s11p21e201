package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.company.CompanyAuthRequest;
import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.request.manager.ManagerAuthRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.repository.company.EmployeeRepository;
import com.e201.global.auth.RoleType;
import com.e201.global.auth.response.AuthResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class EmployeeService extends BaseEntity {

	private final EmployeeRepository employeeRepository;
	private final DepartmentService departmentService;

	@JtaTransactional
	public EmployeeCreateResponse create(EmployeeCreateRequest request) {
		Department department = departmentService.findEntity(request.getDepartmentId());
		Employee employee = request.toEntity(department);
		Employee savedEmployee = employeeRepository.save(employee);
		return new EmployeeCreateResponse(savedEmployee.getId());
	}

	public AuthResponse checkPassword(EmployeeAuthRequest request) {
		Employee employee = employeeRepository.findByCode(request.getCode())
			.orElseThrow(() -> new RuntimeException("not found employee"));
		validatePassword(request, employee);
		return new AuthResponse(employee.getId(), RoleType.EMPLOYEE);
	}

	public Employee findEntity(UUID id) {
		return employeeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	private void validatePassword(EmployeeAuthRequest request, Employee employee) {
		if(!request.getPassword().equals(employee.getPassword())) {
			throw new RuntimeException("wrong password");
		}
	}
}
