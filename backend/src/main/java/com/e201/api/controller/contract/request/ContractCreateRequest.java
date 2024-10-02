package com.e201.api.controller.contract.request;

import java.util.UUID;

import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractCreateRequest {

	@NotBlank
	// @Size(min = 36)
	private String senderId;

	@NotBlank
	private String receiverRegisterNumber;

	@NotBlank
	private int settlementDay;

	@Builder
	private ContractCreateRequest(String senderId, String receiverRegisterNumber, int settlementDay) {
		this.senderId = senderId;
		this.receiverRegisterNumber = receiverRegisterNumber;
		this.settlementDay = settlementDay;
	}

	public Contract toEntity(UUID companyId, UUID storeId, ContractStatus status) {
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.settlementDay(settlementDay)
			.status(status)
			.build();
	}
}
