package com.e201.api.controller.contract.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InvoiceCreateResponse {
	private UUID id;

	public InvoiceCreateResponse(UUID id) {
		this.id = id;
	}

}
