package com.e201.api.controller.payment.response;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeeTotalPaymentResponse {

	private UUID employeeId;
	private String employeeName;
	private UUID departmentId;
	private String departmentName;
	private Integer supportAmount;
	private Long spentAmount;
	private LocalDateTime createdAt;

	@Builder
	private EmployeeTotalPaymentResponse(UUID employeeId, String employeeName, UUID departmentId, String departmentName,
		Integer supportAmount, Long spentAmount, LocalDateTime createdAt) {
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.supportAmount = supportAmount;
		this.spentAmount = spentAmount;
		this.createdAt = createdAt;
	}
}
