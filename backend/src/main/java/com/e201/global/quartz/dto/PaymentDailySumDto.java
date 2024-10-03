package com.e201.global.quartz.dto;

import java.util.UUID;

import lombok.Getter;

@Getter
public class PaymentDailySumDto {
	private UUID contractId;
	private Long dailySum;

	public PaymentDailySumDto(UUID contractId, Long dailySum) {
		this.contractId = contractId;
		this.dailySum = dailySum;
	}
}

