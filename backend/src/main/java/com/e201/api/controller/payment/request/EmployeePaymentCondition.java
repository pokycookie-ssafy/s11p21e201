package com.e201.api.controller.payment.request;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class EmployeePaymentCondition {

	@NotBlank
	@DateTimeFormat
	private LocalDateTime startDate;

	@NotBlank
	@DateTimeFormat
	private LocalDateTime endDate;

	@Builder
	private EmployeePaymentCondition(LocalDateTime startDate, LocalDateTime endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
