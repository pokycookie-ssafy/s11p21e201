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
	private String category;

	@Builder
	public MenuFindResponse( UUID id, String menuName,int price, String category) {
		this.id = id;
		this.menuName = menuName;
		this.price = price;
		this.category = category;
	}
}
