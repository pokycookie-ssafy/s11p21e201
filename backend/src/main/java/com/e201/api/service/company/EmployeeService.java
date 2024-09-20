package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.EmployeeCreateRequest;
import com.e201.api.controller.company.response.EmployeeCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.repository.company.EmployeeRepository;

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

	public Employee findEntity(UUID id) {
		return employeeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
