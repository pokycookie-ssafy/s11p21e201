package com.e201.api.controller.store.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindPaymentsResponse {
	private UUID paymentId;
	private UUID companyId;
	private String companyName;
	private UUID employeeId;
	private String employeeCode;
	private List<FindPaymentMenu> menus;
	private LocalDateTime createdAt;

	@Builder
	private FindPaymentsResponse(UUID paymentId, UUID companyId, String companyName, UUID employeeId, String employeeCode, List<FindPaymentMenu> menus, LocalDateTime createdAt) {
		this.paymentId = paymentId;
		this.companyId = companyId;
		this.companyName = companyName;
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.menus = menus;
		this.createdAt = createdAt;
	}
}
