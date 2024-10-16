package com.e201.api.controller.company.request.department;

import java.util.UUID;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DepartmentCreateRequest {

	@NotBlank
	private String code;

	@NotBlank
	private String name;

	@Builder
	private DepartmentCreateRequest(String code, String name) {
		this.code = code;
		this.name = name;
	}

	public Department toEntity(Company company) {
		return Department.builder()
			.company(company)
			.code(code)
			.name(name)
			.build();
	}
}
