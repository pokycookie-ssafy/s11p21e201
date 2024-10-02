package com.e201.api.controller.payment.request;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeTotalPaymentCondition {
	private UUID departmentId;
	private LocalDateTime startDate;
	private LocalDateTime endDate;

	@Builder
	private EmployeeTotalPaymentCondition(UUID employeeId, UUID departmentId, LocalDateTime startDate,
		LocalDateTime endDate) {
		this.departmentId = departmentId;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
