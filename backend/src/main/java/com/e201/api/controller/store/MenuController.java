package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.service.store.MenuService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MenuController {
	private final MenuService menuService;

	@PostMapping("/stores/menus")
	public ResponseEntity<MenuCreateResponse> create(@Auth AuthInfo authInfo,@RequestBody MenuCreateRequest menuCreateRequest){
		MenuCreateResponse response = menuService.create(authInfo.getId(), authInfo.getRoleType(),menuCreateRequest);
		return ResponseEntity.status(CREATED).body(response);
	}
}
