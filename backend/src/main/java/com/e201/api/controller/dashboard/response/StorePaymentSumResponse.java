package com.e201.api.controller.dashboard.response;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StorePaymentSumResponse {

	private UUID storeId;
	private String storeName;
	private Long amount;

	@Builder
	public StorePaymentSumResponse(UUID storeId, String storeName, Long amount) {
		this.storeId = storeId;
		this.storeName = storeName;
		this.amount = amount;
	}
}
