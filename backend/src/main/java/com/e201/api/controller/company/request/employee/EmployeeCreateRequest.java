package com.e201.api.controller.company.request.employee;

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

	@NotBlank
	@Size(min = 8)
	private String name;

	@NotBlank
	private Long supportAmount;

	@Builder
	public EmployeeCreateRequest(String code, String password, String name, Long supportAmount) {
		this.code = code;
		this.password = password;
		this.name = name;
		this.supportAmount = supportAmount;
	}

	public Employee toEntity(Department department) {
		return Employee.builder()
			.department(department)
			.code(code)
			.password(password)
			.name(name)
			.supportAmount(supportAmount)
			.build();
	}
}
