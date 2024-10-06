package com.e201.api.controller.dashboard.response;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeePaymentSumResponse {

	private UUID employeeId;
	private String employeeName;
	private Long amount;

	@Builder
	public EmployeePaymentSumResponse(UUID employeeId, String employeeName, Long amount) {
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.amount = amount;
	}
}
