package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.request.MenuUpdateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.controller.store.response.MenuDeleteResponse;
import com.e201.api.controller.store.response.MenuUpdateResponse;
import com.e201.api.service.store.MenuService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Transactional
public class MenuController {
	private final MenuService menuService;

	@PostMapping("/stores/menus")
	public ResponseEntity<MenuCreateResponse> create(@Auth AuthInfo authInfo,@RequestBody MenuCreateRequest menuCreateRequest){
		MenuCreateResponse response = menuService.create(authInfo.getId(), authInfo.getRoleType(),menuCreateRequest);
		return ResponseEntity.status(CREATED).body(response);
	}

	@PutMapping("/stores/menus/{menuId}")
	public ResponseEntity<MenuUpdateResponse> update(@Auth AuthInfo authInfo,
		@RequestBody MenuUpdateRequest menuUpdateRequest,
		@PathVariable UUID menuId){
		MenuUpdateResponse response =
			menuService.modify( authInfo.getRoleType(), menuUpdateRequest);
		return ResponseEntity.status(OK).body(response);
	}
	@DeleteMapping("/stores/menus/{menuId}")
	public ResponseEntity<MenuDeleteResponse> delete(@Auth AuthInfo authInfo,
		@PathVariable UUID menuId){
		MenuDeleteResponse response = menuService.delete(menuId, authInfo.getRoleType());
		return ResponseEntity.status(OK).body(response);
	}
}
