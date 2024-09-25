package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.StoreAccountCreateRequest;
import com.e201.api.controller.store.response.StoreAccountCreateResponse;
import com.e201.api.service.store.StoreAccountService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StoreAccountController {
	private final StoreAccountService storeAccountService;

	@PostMapping("/stores/accounts")
	public ResponseEntity<StoreAccountCreateResponse> create(@Auth AuthInfo authInfo, @RequestBody StoreAccountCreateRequest storeAccountCreateRequest){
		StoreAccountCreateResponse response = storeAccountService.create(authInfo.getId(), authInfo.getRoleType() ,storeAccountCreateRequest);
		return ResponseEntity.status(CREATED).body(response);
	}
}
