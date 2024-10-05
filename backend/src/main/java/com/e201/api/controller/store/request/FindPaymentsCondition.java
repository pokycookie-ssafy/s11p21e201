package com.e201.api.controller.store.request;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FindPaymentsCondition {
	@NotBlank
	@DateTimeFormat
	LocalDateTime start;
	@NotBlank
	@DateTimeFormat
	LocalDateTime end;
	private UUID companyId= null;

	@Builder
	private FindPaymentsCondition(LocalDateTime startDate, LocalDateTime endDate, UUID companyId) {
		this.start = startDate;
		this.end = endDate;
		this.companyId = companyId;
	}
}
