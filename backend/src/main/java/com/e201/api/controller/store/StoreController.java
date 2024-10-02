package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.StoreAndStoreInfoCreateRequest;
import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreDeleteResponse;
import com.e201.api.service.store.StoreService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StoreController {
	private final StoreService storeService;

	@PostMapping("/stores")
	public ResponseEntity<StoreCreateResponse> create(@RequestBody StoreAndStoreInfoCreateRequest storeAndStoreInfoCreateRequest){
		StoreCreateResponse response = storeService.create(storeAndStoreInfoCreateRequest);
		return ResponseEntity.status(CREATED).body(response);
	}

	@DeleteMapping("/stores")
	public ResponseEntity<StoreDeleteResponse> delete(@Auth AuthInfo authInfo){
		StoreDeleteResponse response = storeService.delete(authInfo.getId(), authInfo.getRoleType());
		return ResponseEntity.status(NO_CONTENT).body(response);
	}

}
