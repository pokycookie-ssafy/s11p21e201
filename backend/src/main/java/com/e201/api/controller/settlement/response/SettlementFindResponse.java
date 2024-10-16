package com.e201.api.controller.settlement.response;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SettlementFindResponse {
	private UUID id;
	private UUID partnerId;
	private String partnerName;
	private LocalDateTime settlementDate;
	private LocalDateTime settledDate;
	private Long settlementAmount;
	private Long settledAmount;
	private Long receivable;
	private String taxInvoice;

	@Builder
	private SettlementFindResponse(UUID id, UUID partnerId, String partnerName, LocalDateTime settlementDate,
		LocalDateTime settledDate, Long settlementAmount, Long settledAmount, Long receivable, String taxInvoice) {
		this.id = id;
		this.partnerId = partnerId;
		this.partnerName = partnerName;
		this.settlementDate = settlementDate;
		this.settledDate = settledDate;
		this.settlementAmount = settlementAmount;
		this.settledAmount = settledAmount;
		this.receivable = receivable;
		this.taxInvoice = taxInvoice;
	}
}
