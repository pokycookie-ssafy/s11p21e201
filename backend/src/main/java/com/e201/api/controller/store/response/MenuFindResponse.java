package com.e201.api.controller.store.response;

import java.util.UUID;

import com.e201.domain.entity.store.Menu;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuFindResponse {
	private UUID id;
	private String name;
	private int price;
	private String category;

	@Builder
	private MenuFindResponse(UUID id, String name, int price, String category) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.category = category;
	}

	public static MenuFindResponse of(Menu menu) {
		return MenuFindResponse.builder()
			.id(menu.getId())
			.name(menu.getName())
			.price(menu.getPrice())
			.category(menu.getCategory())
			.build();
	}
}
