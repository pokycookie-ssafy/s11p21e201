package com.e201.global.quartz.dto;

import java.util.UUID;

import lombok.Getter;

@Getter
public class PaymentMonthlySumDto {
	private UUID contractId;
	private Long monthlySum;

	public PaymentMonthlySumDto(UUID contractId, Long monthlySum) {
		this.contractId = contractId;
		this.monthlySum = monthlySum;
	}
}

