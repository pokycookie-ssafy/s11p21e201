package com.e201.api.controller.store.request;

import java.util.List;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StorePaymentCreateRequest {
	private UUID employeeId;
	private String qrId;
	private List<PaymentMenuCreateRequest> menus;
	private long totalAmount;

	@Builder
	private StorePaymentCreateRequest(UUID employeeId, String qrId, List<PaymentMenuCreateRequest> menus,
		int totalAmount) {
		this.employeeId = employeeId;
		this.qrId = qrId;
		this.menus = menus;
		this.totalAmount = totalAmount;
	}
}
