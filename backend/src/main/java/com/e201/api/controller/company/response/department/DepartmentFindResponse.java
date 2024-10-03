package com.e201.api.controller.company.response.department;

import java.util.UUID;

import com.e201.domain.entity.company.Department;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DepartmentFindResponse {

	private UUID id;

	private String code;

	private String name;

	@Builder
	public DepartmentFindResponse(UUID id, String code, String name) {
		this.id = id;
		this.code = code;
		this.name = name;
	}

	public static DepartmentFindResponse of(Department department) {
		return DepartmentFindResponse.builder()
			.id(department.getId())
			.code(department.getCode())
			.name(department.getName())
			.build();
	}
}
