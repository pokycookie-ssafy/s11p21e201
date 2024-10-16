package com.e201.api.controller.store.request;

import java.util.UUID;

import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Sales;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class SalesCreateRequest {
	private UUID menuId;
	private UUID companyId;

	@Builder
	private SalesCreateRequest(final UUID menuId, final UUID companyId) {
		this.menuId	= menuId;
		this.companyId = companyId;
	}

	public Sales toEntity(Menu menu) {
		return Sales.builder()
			.menu(menu)
			.companyId(companyId)
			.build();
	}
}
