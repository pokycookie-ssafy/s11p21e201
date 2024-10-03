package com.e201.api.controller.company.response.employee;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeeAuthResponse {

	private UUID employeeId;
	private String employeeName;
	private UUID departmentId;
	private String departmentName;

	@Builder
	public EmployeeAuthResponse(UUID employeeId, String employeeName, UUID departmentId, String departmentName) {
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
	}
}
