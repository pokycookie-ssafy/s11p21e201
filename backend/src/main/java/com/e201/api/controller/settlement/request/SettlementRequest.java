package com.e201.api.controller.settlement.request;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SettlementRequest {
	private UUID settlementId;
	private Long amount;

	@Builder
	private SettlementRequest(UUID settlementId, Long amount) {
		this.settlementId = settlementId;
		this.amount = amount;
	}
}
