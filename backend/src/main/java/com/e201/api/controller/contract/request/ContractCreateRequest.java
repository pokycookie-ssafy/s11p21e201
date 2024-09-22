package com.e201.api.controller.contract.request;

import java.util.UUID;

import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractCreateRequest {
	private String companyId;
	private String storeId;
	private int sattlementDate;

	@Builder
	public ContractCreateRequest(String companyId, String storeId, int sattlementDate) {
		this.companyId = companyId;
		this.storeId = storeId;
		this.sattlementDate = sattlementDate;
	}

	public Contract toEntity(Status status){
		return Contract.builder()
			.companyId(UUID.fromString(companyId))
			.storeId(UUID.fromString(storeId))
			.sattlementDate(sattlementDate)
			.status(status)
			.build();
	}
}
