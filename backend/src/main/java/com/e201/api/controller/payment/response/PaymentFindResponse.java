package com.e201.api.controller.payment.response;

import java.time.LocalDateTime;
import java.util.UUID;

import com.e201.domain.entity.payment.Payment;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PaymentFindResponse {

	private UUID id;
	private UUID storeId;
	private String storeName;
	private Long spentAmount;
	private LocalDateTime paymentDate;

	@Builder
	private PaymentFindResponse(UUID id, UUID storeId, String storeName, Long spentAmount, LocalDateTime paymentDate) {
		this.id = id;
		this.storeId = storeId;
		this.storeName = storeName;
		this.spentAmount = spentAmount;
		this.paymentDate = paymentDate;
	}

	public static PaymentFindResponse of(Payment payment) {
		return PaymentFindResponse.builder()
			.id(payment.getId())
			.storeId(payment.getStoreId())
			.storeName(payment.getStoreName())
			.spentAmount(payment.getTotalAmount())
			.paymentDate(payment.getPaymentDate())
			.build();
	}
}
