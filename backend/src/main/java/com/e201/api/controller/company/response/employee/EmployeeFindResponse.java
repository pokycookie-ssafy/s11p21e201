package com.e201.api.controller.company.response.employee;

import java.time.LocalDateTime;
import java.util.UUID;

import com.e201.domain.entity.company.Employee;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeeFindResponse {

	private UUID id;
	private String employeeCode;
	private String employeeName;
	private UUID departmentId;
	private String departmentName;
	private Integer supportAmount;
	private LocalDateTime createdAt;

	@Builder
	public EmployeeFindResponse(UUID id, String employeeCode, String employeeName, UUID departmentId,
		String departmentName,
		Integer supportAmount, LocalDateTime createdAt) {
		this.id = id;
		this.employeeCode = employeeCode;
		this.employeeName = employeeName;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.supportAmount = supportAmount;
		this.createdAt = createdAt;
	}

	public static EmployeeFindResponse of(Employee employee) {
		return EmployeeFindResponse.builder()
			.id(employee.getId())
			.employeeCode(employee.getCode())
			.employeeName(employee.getName())
			.departmentId(employee.getDepartment().getId())
			.departmentName(employee.getDepartment().getName())
			.supportAmount(employee.getSupportAmount())
			.createdAt(employee.getCreatedAt())
			.build();
	}
}
