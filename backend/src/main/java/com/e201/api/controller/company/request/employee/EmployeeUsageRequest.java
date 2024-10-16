package com.e201.api.controller.company.request.employee;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class EmployeeUsageRequest {

	@DateTimeFormat
	private LocalDateTime startDate;

	@DateTimeFormat
	private LocalDateTime endDate;

	@Builder
	private EmployeeUsageRequest(LocalDateTime startDate, LocalDateTime endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
