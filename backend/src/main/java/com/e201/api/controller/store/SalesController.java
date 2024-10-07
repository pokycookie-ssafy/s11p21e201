package com.e201.api.controller.store;

import static org.springframework.http.HttpStatus.*;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.FindPaymentsCondition;
import com.e201.api.controller.store.request.StorePaymentCreateRequest;
import com.e201.api.controller.store.response.FindPaymentsResponse;
import com.e201.api.service.store.SalesService;
import com.e201.api.service.store.StoreService;
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

	// /payments/stores?start={startTime}&end={endTime}&company={companyId}
	@GetMapping("/payments/stores")
	public ResponseEntity<List<FindPaymentsResponse>> findPayments(@Auth AuthInfo authInfo,
		@ModelAttribute FindPaymentsCondition findPaymentsCondition){
		UUID storeId = authInfo.getId();
		List<FindPaymentsResponse> paymentsResponse = salesService.findStorePayments(storeId, findPaymentsCondition);
		return ResponseEntity.ok().body(paymentsResponse);
	}

	@GetMapping("/stores/dashboard/total")
	public ResponseEntity<List<FindPaymentsResponse>> findAllStorePayments(@Auth AuthInfo authInfo){
		UUID storeId = authInfo.getId();
		List<FindPaymentsResponse> paymentsResponses = salesService.findAllStorePayments(storeId);
		return ResponseEntity.ok().body(paymentsResponses);
	}
}
