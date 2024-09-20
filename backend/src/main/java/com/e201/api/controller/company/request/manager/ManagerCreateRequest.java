package com.e201.api.controller.company.request.manager;

import java.util.UUID;

import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Manager;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ManagerCreateRequest {

	private UUID departmentId;
	private String code;
	private String password;

	@Builder
	private ManagerCreateRequest(UUID departmentId, String code, String password) {
		this.departmentId = departmentId;
		this.code = code;
		this.password = password;
	}

	public Manager toEntity(Department department) {
		return Manager.builder()
			.department(department)
			.code(code)
			.password(password)
			.build();
	}
}
