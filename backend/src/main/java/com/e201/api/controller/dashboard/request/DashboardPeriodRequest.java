package com.e201.api.controller.dashboard.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class DashboardPeriodRequest {

	@NotBlank
	private LocalDateTime startDate;

	@NotBlank
	private LocalDateTime endDate;

	@Builder
	private DashboardPeriodRequest(LocalDateTime startDate, LocalDateTime endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
