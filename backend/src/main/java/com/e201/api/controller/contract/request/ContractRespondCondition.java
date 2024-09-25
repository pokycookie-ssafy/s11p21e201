package com.e201.api.controller.contract.request;

import com.e201.domain.entity.contract.ContractRespondType;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractRespondCondition {

	@NotBlank
	String contractId;

	@NotBlank
	ContractRespondType respondResult;

	@Builder
	private ContractRespondCondition(String contractId, ContractRespondType respondResult) {
		this.contractId = contractId;
		this.respondResult = respondResult;
	}
}
