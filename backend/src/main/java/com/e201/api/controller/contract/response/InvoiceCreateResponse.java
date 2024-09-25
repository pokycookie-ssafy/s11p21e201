package com.e201.api.controller.contract.response;

import java.util.UUID;

import lombok.Getter;

@Getter
public class InvoiceCreateResponse {
	private UUID id;

	public InvoiceCreateResponse(UUID id) {
		this.id = id;
	}

}
