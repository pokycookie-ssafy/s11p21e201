package com.e201.api.controller.store.request;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PaymentMenuCreateRequest {
	private UUID id;

	public PaymentMenuCreateRequest(UUID id) {
		this.id = id;
	}
}
