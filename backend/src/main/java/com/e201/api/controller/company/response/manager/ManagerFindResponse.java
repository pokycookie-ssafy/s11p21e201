package com.e201.api.controller.company.response.manager;

import java.time.LocalDateTime;
import java.util.UUID;

import com.e201.domain.entity.company.Manager;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ManagerFindResponse {
	private UUID id;
	private String code;
	private UUID departmentId;
	private String departmentName;
	private LocalDateTime createdAt;

	@Builder
	private ManagerFindResponse(UUID id, String code, UUID departmentId, String departmentName,
		LocalDateTime createdAt) {
		this.id = id;
		this.code = code;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.createdAt = createdAt;
	}

	public static ManagerFindResponse of(Manager manager) {
		return ManagerFindResponse.builder()
			.id(manager.getId())
			.code(manager.getCode())
			.departmentId(manager.getDepartment().getId())
			.departmentName(manager.getDepartment().getName())
			.createdAt(manager.getCreatedAt())
			.build();
	}
}
