package com.e201.api.controller.contract.response;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class ContractFindResponse {
	private LocalDateTime contractDate;
	private int settlementDate;
	private String contactId;
	private String storeId;
	private String companyId;
	private String storeName;
	private String companyName;

	public ContractFindResponse(LocalDateTime contractDate, int settlementDate, String contactId, String storeId, String companyId, String storeName, String companyName) {
		this.contractDate = contractDate;
		this.settlementDate = settlementDate;
		this.contactId = contactId;
		this.storeId = storeId;
		this.companyId = companyId;
		this.storeName = storeName;
		this.companyName = companyName;
	}
}
