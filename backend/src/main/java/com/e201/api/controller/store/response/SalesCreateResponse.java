package com.e201.api.controller.store.response;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SalesCreateResponse {

		private UUID id;
		private UUID companyId;
		private String paymentId;
		private String menuName;
		private	String companyName;
		private	LocalDate createdAt;
		int menuPrice;

		@Builder
		public SalesCreateResponse(UUID id, UUID companyId, String paymentId, String menuName, String companyName, LocalDate createdAt) {
			this.id = id;
			this.companyId = companyId;
			this.paymentId = paymentId;
			this.menuName = menuName;
			this.companyName = companyName;
			this.createdAt = createdAt;
		}
}
