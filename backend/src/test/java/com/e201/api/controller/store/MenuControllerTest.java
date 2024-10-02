package com.e201.api.controller.store;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.request.MenuUpdateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.controller.store.response.MenuDeleteResponse;
import com.e201.api.controller.store.response.MenuFindResponse;
import com.e201.api.controller.store.response.MenuUpdateResponse;
import com.e201.api.service.store.MenuService;
import com.e201.global.security.auth.constant.AuthConstant;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(MenuController.class)
public class MenuControllerTest extends AbstractRestDocsTest {
	@MockBean
	private MenuService menuService;

	@DisplayName("메뉴를 등록한다.")
	@Test
	void create_menu_success() throws Exception {
		//given
		UUID menuId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), RoleType.STORE);
		MenuCreateRequest request = createMenuRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		MenuCreateResponse response = new MenuCreateResponse(menuId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(menuService).create(any(), any(), any(MenuCreateRequest.class));

		//expected
		mockMvc.perform(post("/stores/menus")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("메뉴를 수정한다.")
	@Test
	void modify_menu_success() throws Exception {
		UUID menuId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), RoleType.STORE);
		MenuUpdateRequest request = createMenuUpdateRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		MenuUpdateResponse response = new MenuUpdateResponse(menuId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(menuService).modify(any(), any(), any(MenuUpdateRequest.class));

		//expected
		mockMvc.perform(put("/stores/menus/" + menuId)
				.contentType(APPLICATION_JSON)
				.content(requestJson)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));

	}

	@DisplayName("메뉴를 삭제한다.")
	@Test
	void delete_menu_success() throws Exception {
		UUID menuId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), RoleType.STORE);

		MenuDeleteResponse response = new MenuDeleteResponse(menuId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(menuService).delete(any(), any());

		//expected
		mockMvc.perform(delete("/stores/menus/" + menuId)
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("단건 메뉴를 조회한다.")
	@Test
	void findOne_menu_success() throws Exception {
		UUID menuId = UUID.randomUUID();
		MenuFindResponse response = createMenuResponse(menuId);
		String responseJson = objectMapper.writeValueAsString(response);
		doReturn(response).when(menuService).findOne(any());

		mockMvc.perform(get("/stores/menus/" + menuId)
				.contentType(APPLICATION_JSON)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("한 식당의 메뉴 리스트를 조회한다.")
	@Test
	void findAll_menu_success() throws Exception {
		UUID storeId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), RoleType.STORE);

		List<MenuFindResponse> menuFindResponseList = lists(storeId);
		String responseJson = objectMapper.writeValueAsString(menuFindResponseList);
		doReturn(menuFindResponseList).when(menuService).find(any(), any());

		mockMvc.perform(get("/stores/menus")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	private List<MenuFindResponse> lists(UUID storeId) {
		MenuFindResponse mr1 = createMenuResponse(UUID.randomUUID());
		MenuFindResponse mr2 = createMenuResponse(UUID.randomUUID());
		MenuFindResponse mr3 = createMenuResponse(UUID.randomUUID());
		List<MenuFindResponse> menuFindResponseList = new ArrayList<>();
		menuFindResponseList.add(mr1);
		menuFindResponseList.add(mr2);
		menuFindResponseList.add(mr3);
		return menuFindResponseList;
	}

	private MenuFindResponse createMenuResponse(UUID menuId) {
		return MenuFindResponse.builder()
			.id(menuId)
			.name("메뉴이름")
			.category("음료")
			.price(5000).build();
	}

	private MenuUpdateRequest createMenuUpdateRequest() {
		return MenuUpdateRequest.builder()
			.menuName("메뉴이름")
			.category("음료")
			.price(2132)
			.build();
	}

	private MenuCreateRequest createMenuRequest() {
		return MenuCreateRequest.builder()
			.price(10000)
			.category("음료")
			.build();
	}
}
