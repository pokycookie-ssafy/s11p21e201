package com.e201.api.controller.store.response;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuFindResponse {
	private UUID id;
	private String menuName;
	private int price;

	@Builder
	private MenuFindResponse(final UUID id, final String menuName, final int price) {
		this.id = id;
		this.menuName = menuName;
		this.price = price;
	}
}
