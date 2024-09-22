package com.e201.api.controller.contract.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractCreateResponse {
	private UUID id;

	public ContractCreateResponse(UUID id){
		this.id = id;
	}
}
