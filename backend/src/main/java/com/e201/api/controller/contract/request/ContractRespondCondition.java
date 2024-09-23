package com.e201.api.controller.contract.request;

import com.e201.domain.entity.contract.ContractResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractRespondCondition {
	String contractId;
	ContractResponse respondResult;

	@Builder
	public ContractRespondCondition(String contractId, ContractResponse respondResult) {
		this.contractId = contractId;
		this.respondResult = respondResult;
	}
}
