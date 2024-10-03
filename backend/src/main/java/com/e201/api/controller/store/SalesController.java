package com.e201.api.controller.store;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.StorePaymentCreateRequest;
import com.e201.api.service.store.SalesService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SalesController {
	private final SalesService salesService;

	@PostMapping("/stores/sales")
	public ResponseEntity<Void> create(@Auth AuthInfo authInfo,
		@RequestBody StorePaymentCreateRequest storePaymentCreateRequest) {
		salesService.createPayment(storePaymentCreateRequest, authInfo.getId());
		return ResponseEntity.ok().build();
	}
}
