package com.e201.api.controller.payment.response;

import java.util.UUID;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EmployeeSpentAmount {
	private UUID employeeId;
	private Long spentAmount;

	public EmployeeSpentAmount(UUID employeeId, Long spentAmount) {
		this.employeeId = employeeId;
		this.spentAmount = spentAmount;
	}
}
