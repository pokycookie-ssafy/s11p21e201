package com.e201.api.controller.contract.request;

import java.util.UUID;

import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractCreateRequest {
	private String companyId;
	private String storeId;
	private int settlementDate;

	@Builder
	public ContractCreateRequest(String companyId, String storeId, int settlementDate) {
		this.companyId = companyId;
		this.storeId = storeId;
		this.settlementDate = settlementDate;
	}

	public Contract toEntity(ContractStatus status){
		return Contract.builder()
			.companyId(UUID.fromString(companyId))
			.storeId(UUID.fromString(storeId))
			.settlementDate(settlementDate)
			.status(status)
			.build();
	}
}
