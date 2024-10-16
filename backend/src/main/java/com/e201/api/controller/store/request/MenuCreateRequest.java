package com.e201.api.controller.store.request;

import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Store;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class MenuCreateRequest {
	private String name;
	private int price;
	private String category;
	@Builder
	private MenuCreateRequest(String name, int price, String category) {
		this.name = name;
		this.price = price;
		this.category = category;
	}

	public Menu toEntity(Store store){
		return Menu.builder()
			.store(store)
			.name(name)
			.price(price)
			.category(category)
			.build();
	}

}
