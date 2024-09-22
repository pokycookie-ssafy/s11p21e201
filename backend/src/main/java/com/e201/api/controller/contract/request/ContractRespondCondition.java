package com.e201.api.controller.contract.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractRespondCondition {
	String contractId;
	String respondResult;

	@Builder
	public ContractRespondCondition(String contractId, String respondResult) {
		this.contractId = contractId;
		this.respondResult = respondResult;
	}
}
