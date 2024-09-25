package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.api.service.store.StoreInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StoreInfoController {
	private final StoreInfoService storeInfoService;

	@PostMapping("/stores/info")
	public ResponseEntity<StoreInfoCreateResponse> create(@RequestBody StoreInfoCreateRequest storeInfoCreateRequest){
		StoreInfoCreateResponse response = storeInfoService.create(storeInfoCreateRequest);
		return ResponseEntity.status(CREATED).body(response);
	}
}
