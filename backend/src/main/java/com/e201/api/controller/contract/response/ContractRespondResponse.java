package com.e201.api.controller.contract.response;

import java.util.UUID;

import lombok.Getter;

@Getter
public class ContractRespondResponse {
	UUID id;

	public ContractRespondResponse(UUID id) {
		this.id = id;
	}
}
