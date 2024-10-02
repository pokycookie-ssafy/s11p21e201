package com.e201.api.controller.payment.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeePaymentCondition {

	@NotBlank
	private LocalDateTime startDate;

	@NotBlank
	private LocalDateTime endDate;

	@Builder
	private EmployeePaymentCondition(LocalDateTime startDate, LocalDateTime endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
