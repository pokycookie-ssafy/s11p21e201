package com.e201.api.controller.payment.request;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeePaymentCondition {

	@NotBlank
	private UUID employeeId;

	@NotBlank
	private LocalDateTime startDate;

	@NotBlank
	private LocalDateTime endDate;

	@Builder
	private EmployeePaymentCondition(UUID employeeId, LocalDateTime startDate, LocalDateTime endDate) {
		this.employeeId = employeeId;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
