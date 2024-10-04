package com.e201.api.controller.payment.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.e201.api.controller.store.response.MenuFindResponse;
import com.e201.domain.entity.payment.Payment;
import com.e201.domain.entity.store.Menu;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PaymentAndMenusFindResponse {

	private UUID id;
	private UUID storeId;
	private String storeName;
	private Long amount;
	private LocalDateTime paymentDate;
	private List<MenuFindResponse> menus;

	@Builder
	public PaymentAndMenusFindResponse(UUID id, UUID storeId, String storeName, Long amount,
		LocalDateTime paymentDate) {
		this.id = id;
		this.storeId = storeId;
		this.storeName = storeName;
		this.amount = amount;
		this.paymentDate = paymentDate;
		this.menus = new ArrayList<>();
	}

	public static PaymentAndMenusFindResponse of(Payment payment) {
		return PaymentAndMenusFindResponse.builder()
			.id(payment.getId())
			.storeId(payment.getStoreId())
			.storeName(payment.getStoreName())
			.paymentDate(payment.getPaymentDate())
			.build();
	}

	public void addMenus(Menu menu) {
		this.menus.add(MenuFindResponse.of(menu));
	}
}
