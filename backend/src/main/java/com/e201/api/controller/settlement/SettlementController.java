package com.e201.api.controller.settlement;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.settlement.request.SettlementFindRequest;
import com.e201.api.controller.settlement.request.SettlementRequest;
import com.e201.api.controller.settlement.response.SettlementFindResponse;
import com.e201.api.controller.settlement.response.SettlementResponse;
import com.e201.api.service.settlement.SettlementService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SettlementController {

	private final SettlementService settlementService;

	@GetMapping("/settlements")
	public ResponseEntity<List<SettlementFindResponse>> find(@Auth AuthInfo authInfo,
		@ModelAttribute SettlementFindRequest request) {

		List<SettlementFindResponse> response = settlementService.find(authInfo, request);

		return ResponseEntity.status(OK).body(response);
	}

	@PostMapping("/settlements")
	public ResponseEntity<SettlementResponse> settlement(@Auth AuthInfo authInfo,
		@RequestBody SettlementRequest request) {

		SettlementResponse response = settlementService.settlement(authInfo, request);
		return ResponseEntity.status(OK).body(response);
	}
}
