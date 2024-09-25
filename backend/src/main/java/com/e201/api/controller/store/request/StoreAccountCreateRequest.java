package com.e201.api.controller.store.request;

import java.util.UUID;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreAccount;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class StoreAccountCreateRequest {
	private String bankCode;
	private	String bankName;
	private String accountNumber;

	@Builder
	private StoreAccountCreateRequest(String bankCode, String bankName, String accountNumber) {
		this.bankCode=bankCode;
		this.bankName = bankName;
		this.accountNumber= accountNumber;
	}


	public StoreAccount toEntity(Store store){
		return StoreAccount.builder()
			.store(store)
			.bankCode(bankCode)
			.bankName(bankName)
			.accountNumber(accountNumber)
			.build();
	}
}
