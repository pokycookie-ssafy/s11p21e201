package com.e201.api.controller.company.request.employee;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeUsageRequest {

	private LocalDateTime startDate;
	private LocalDateTime endDate;

	@Builder
	private EmployeeUsageRequest(LocalDateTime startDate, LocalDateTime endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
