package com.e201.api.controller.contract.response;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class ContractFindResponse {
	private String contractId;
	private String comapnyId;
	private String companyName;
	private String companyEmail;
	private String companyPhone;
	private String companyAddress;
	private String storeId;
	private String storeName;
	private String storeEmail;
	private String storePhone;
	private String storeAddress;
	private LocalDateTime contractDate;
	private int settlementDate;
	private String status;

	public ContractFindResponse(String contractId,
		String companyId, String companyName, String companyEmail, String companyPhone, String companyAddress,
		String storeId, String storeName, String storeEmail, String storePhone, String storeAddress,
		LocalDateTime contractDate, int settlementDate, String status) {
		this.contractId = contractId;
		this.comapnyId = companyId;
		this.companyName = companyName;
		this.companyEmail = companyEmail;
		this.companyPhone = companyPhone;
		this.companyAddress = companyAddress;
		this.storeId = storeId;
		this.storeName = storeName;
		this.storeEmail = storeEmail;
		this.storePhone = storePhone;
		this.storeAddress = storeAddress;
		this.contractDate = contractDate;
		this.settlementDate = settlementDate;
		this.status = status;
	}
}
