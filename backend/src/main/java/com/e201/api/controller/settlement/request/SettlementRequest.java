package com.e201.api.controller.settlement.request;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SettlementRequest {
	private UUID contractId;
	private Long amount;

	@Builder
	private SettlementRequest(UUID contractId, Long amount) {
		this.contractId = contractId;
		this.amount = amount;
	}
}
