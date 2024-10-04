package com.e201.api.controller.settlement.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SettlementResponse {

	private UUID id;

	public SettlementResponse(UUID id) {
		this.id = id;
	}

}
