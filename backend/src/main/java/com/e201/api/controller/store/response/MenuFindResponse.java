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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	public MenuFindResponse(final UUID id, final String menuName, final int price) {
=======
	private MenuFindResponse(final UUID id, final String menuName, final int price) {
>>>>>>> f2404b4 ([#31] feat: 메뉴 단건 조회 기능 구현)
=======
	public MenuFindResponse(final UUID id, final String menuName, final int price) {
>>>>>>> ad44aae ([#31] feat: 식당 메뉴 리스트 조회 기능 구현)
=======
	public MenuFindResponse( UUID id, String menuName,int price, String category) {
>>>>>>> d51eb1b ([#55] feat: menu 생성, 수정 request 변경, 메뉴리스트 조회 response 변경)
=======
	public MenuFindResponse(UUID id, String name, int price, String category) {
>>>>>>> 9b4834a ([#70] chore: 필드명 변경)
=======
	private MenuFindResponse(UUID id, String name, int price, String category) {
>>>>>>> 565d080 ([#84] feat: 직원 이용 내역 상세 조회 기능 추가)
=======
	private MenuFindResponse(UUID id, String name, int price, String category) {
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
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
