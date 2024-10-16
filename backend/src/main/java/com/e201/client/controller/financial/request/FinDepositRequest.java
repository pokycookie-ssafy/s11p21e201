package com.e201.client.controller.financial.request;

import lombok.Getter;

@Getter
public class FinDepositRequest {

	private String senderAccountNo;
	private String receciverAccountNo;
	private Long transactionBalance;

	public FinDepositRequest(String senderAccountNo, String receciverAccountNo, Long transactionBalance) {
		this.senderAccountNo = senderAccountNo;
		this.receciverAccountNo = receciverAccountNo;
		this.transactionBalance = transactionBalance;
	}
}
