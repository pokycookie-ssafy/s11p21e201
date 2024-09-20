package com.e201.api.controller.company.request.employee;

import java.util.UUID;

import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeCreateRequest {

	private UUID departmentId;
	private String code;
	private String password;

	@Builder
	private EmployeeCreateRequest(UUID departmentId, String code, String password) {
		this.departmentId = departmentId;
		this.code = code;
		this.password = password;
	}

	public Employee toEntity(Department department) {
		return Employee.builder()
			.department(department)
			.code(code)
			.password(password)
			.build();
	}
}
