package com.e201.api.controller.contract.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeFindStoreResponse {
	private String storeName;
	private String storeAddress;
	private String storePhone;

	public EmployeeFindStoreResponse(String storeName, String storeAddress, String storePhone) {
		this.storeName = storeName;
		this.storeAddress = storeAddress;
		this.storePhone = storePhone;
	}
}
