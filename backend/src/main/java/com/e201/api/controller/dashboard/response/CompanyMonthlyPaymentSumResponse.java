package com.e201.api.controller.dashboard.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CompanyMonthlyPaymentSumResponse {

	private int year;
	private int month;
	private Long totalAmount;

	@Builder
	public CompanyMonthlyPaymentSumResponse(int year, int month, Long totalAmount) {
		this.year = year;
		this.month = month;
		this.totalAmount = totalAmount;
	}
}
