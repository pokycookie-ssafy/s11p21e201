package com.e201.api.controller.store.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindPaymentMenu {
	private String name;
	private int price;

	@Builder
	public FindPaymentMenu(String name, int price) {
		this.name=name;
		this.price=price;
	}
}
