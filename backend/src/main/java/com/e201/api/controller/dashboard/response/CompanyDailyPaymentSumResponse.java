package com.e201.api.controller.dashboard.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CompanyDailyPaymentSumResponse {

	private int year;
	private int month;
	private int day;
	private Long totalAmount;

	@Builder
	public CompanyDailyPaymentSumResponse(int year, int month, int day, Long totalAmount) {
		this.year = year;
		this.month = month;
		this.day = day;
		this.totalAmount = totalAmount;
	}
}
