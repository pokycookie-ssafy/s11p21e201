package com.e201.api.controller.company.request.employee;

import java.util.UUID;

import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeCreateRequest {

	@NotBlank
	private String code;

	@NotBlank
	@Size(min = 8)
	private String password;

	@Builder
	private EmployeeCreateRequest(String code, String password) {
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
