package com.e201.api.controller.settlement.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SettlementFindResponse {
	private String id;
	private String companyId;
	private String companyName;
	private LocalDateTime settlementDate;
	private LocalDateTime settledDate;
	private Long settlementAmount;
	private Long settledAmount;
	private String taxInvoice;

	@Builder
	private SettlementFindResponse(String id, String companyId, String companyName, LocalDateTime settlementDate,
		LocalDateTime settledDate, Long settlementAmount, Long settledAmount, String taxInvoice) {
		this.id = id;
		this.companyId = companyId;
		this.companyName = companyName;
		this.settlementDate = settlementDate;
		this.settledDate = settledDate;
		this.settlementAmount = settlementAmount;
		this.settledAmount = settledAmount;
		this.taxInvoice = taxInvoice;
	}
}
