package com.e201.api.controller.payment.response;

import java.util.UUID;

import org.springframework.data.domain.Page;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EmployeePaymentResponse {
	private UUID employeeId;
	private String employeeCode;
	private String employeeName;
	private UUID departmentId;
	private String departmentName;
	private Page<PaymentFindResponse> payments;

	@Builder
	private EmployeePaymentResponse(UUID employeeId, String employeeCode, String employeeName, UUID departmentId,
		String departmentName, Page<PaymentFindResponse> payments) {
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.employeeName = employeeName;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.payments = payments;
	}
}
