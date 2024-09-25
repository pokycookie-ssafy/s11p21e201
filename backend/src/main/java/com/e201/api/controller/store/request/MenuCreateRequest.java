package com.e201.api.controller.store.request;

import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Store;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuCreateRequest {
	private String name;
	private int price;

	@Builder
	public MenuCreateRequest(String name, int price) {
		this.name = name;
		this.price = price;
	}

	public Menu toEntity(Store store){
		return Menu.builder()
			.store(store)
			.name(name)
			.price(this.price)
			.build();
	}

}
