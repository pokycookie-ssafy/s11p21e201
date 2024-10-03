package com.e201.api.controller.company.response.manager;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ManagerAuthResponse {

	private UUID managerId;
	private UUID departmentId;
	private String departmentName;

	@Builder
	public ManagerAuthResponse(UUID managerId, UUID departmentId, String departmentName) {
		this.managerId = managerId;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
	}
}
