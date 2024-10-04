package com.e201.api.controller.company.response.employee;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeeUsageResponse {

	private Long supportAmount;
	private Long usage;

	@Builder
	private EmployeeUsageResponse(Long supportAmount, Long usage) {
		this.supportAmount = supportAmount;
		this.usage = usage;
	}
}
