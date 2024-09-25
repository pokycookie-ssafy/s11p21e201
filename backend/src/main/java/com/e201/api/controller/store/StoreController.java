package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.service.store.StoreService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StoreController {
	private final StoreService storeService;

	@PostMapping("/stores")
	public ResponseEntity<StoreCreateResponse> create(@RequestBody StoreCreateRequest storeCreateRequest){
		StoreCreateResponse response = storeService.create(storeCreateRequest);
		return ResponseEntity.status(CREATED).body(response);
	}
}
