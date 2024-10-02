package com.e201.api.controller.store.request;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotBlank
public class MenuUpdateRequest {

	private String menuName;
	private int price;
	private String category;

	@Builder
	private MenuUpdateRequest(String menuName, int price, String category) {
		this.menuName= menuName;
		this.price = price;
		this.category=category;
	}
}
