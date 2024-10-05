package com.e201.api.controller.payment.request;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeTotalPaymentCondition {

	private UUID departmentId;

	@NotBlank
	@DateTimeFormat
	private LocalDateTime startDate;

	@NotBlank
	@DateTimeFormat
	private LocalDateTime endDate;

	@Builder
	private EmployeeTotalPaymentCondition(UUID departmentId, LocalDateTime startDate, LocalDateTime endDate) {
		this.departmentId = departmentId;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
