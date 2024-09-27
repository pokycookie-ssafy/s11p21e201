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
<<<<<<< HEAD
	public MenuFindResponse(final UUID id, final String menuName, final int price) {
=======
	private MenuFindResponse(final UUID id, final String menuName, final int price) {
>>>>>>> f2404b4 ([#31] feat: 메뉴 단건 조회 기능 구현)
		this.id = id;
		this.menuName = menuName;
		this.price = price;
	}
}
