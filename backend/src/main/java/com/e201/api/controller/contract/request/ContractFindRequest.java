package com.e201.api.controller.contract.request;

import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ContractFindRequest {

	@NotBlank
	private ContractFindStatus status;

	@NotBlank
	private ContractFindCond userCond;

	public ContractFindRequest(ContractFindStatus status, ContractFindCond userCond) {
		this.status = status;
		this.userCond = userCond;
	}
}
