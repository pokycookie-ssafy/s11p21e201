package com.e201.api.controller.contract.request;

import java.util.UUID;

import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractStatus;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractCreateRequest {

	@NotBlank
	private String companyId;

	@NotBlank
	private String storeId;

	@NotBlank
	private int settlementDay;

	@Builder
	private ContractCreateRequest(String companyId, String storeId, int settlementDay) {
		this.companyId = companyId;
		this.storeId = storeId;
		this.settlementDay = settlementDay;
	}

	public Contract toEntity(ContractStatus status) {
		return Contract.builder()
			.companyId(UUID.fromString(companyId))
			.storeId(UUID.fromString(storeId))
			.settlementDay(settlementDay)
			.status(status)
			.build();
	}
}
