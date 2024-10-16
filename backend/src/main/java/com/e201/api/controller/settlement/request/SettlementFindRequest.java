package com.e201.api.controller.settlement.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class SettlementFindRequest {

	@NotBlank
	private LocalDateTime startTime;

	@NotBlank
	private LocalDateTime endTime;

	@Builder
	private SettlementFindRequest(LocalDateTime startTime, LocalDateTime endTime) {
		this.startTime = startTime;
		this.endTime = endTime;
	}

}
