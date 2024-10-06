package com.e201.api.controller.dashboard.response;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DepartmentPaymentSumResponse {

	private UUID departmentId;
	private String departmentName;
	private Long amount;

	@Builder
	public DepartmentPaymentSumResponse(UUID departmentId, String departmentName, Long amount) {
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.amount = amount;
	}
}
