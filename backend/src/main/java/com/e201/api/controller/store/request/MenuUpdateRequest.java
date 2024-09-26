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

	private UUID id;
	private String menuName;
	private int price;

	@Builder
	private MenuUpdateRequest(UUID id,String menuName, int price) {
		this.id= id;
		this.menuName= menuName;
		this.price = price;
	}
}
