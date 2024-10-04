package com.e201.api.controller.store.request;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindPaymentsCondition {
	@NotBlank
	private LocalDateTime start;
	@NotBlank
	private LocalDateTime end;
	private UUID companyId;

	@Builder
	private FindPaymentsCondition(LocalDateTime startDate, LocalDateTime endDate, UUID companyId) {
		this.start = startDate;
		this.end = endDate;
		this.companyId = companyId;
	}
}
