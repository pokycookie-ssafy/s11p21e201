package com.e201.client.controller.financial;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.client.controller.financial.request.FinDepositRequest;
import com.e201.client.service.financial.FinancialService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FinancialController {

	private final FinancialService financialService;

	@PostMapping("/fin/create")
	public ResponseEntity<String> finCreateAccount(){
		String result = financialService.createAccount();
		return ResponseEntity.ok(result);
	}

	@PostMapping("/fin/transfer")
	public ResponseEntity<String> finTransferDeposit(@Auth AuthInfo authInfo, @RequestBody FinDepositRequest request){
		String result = financialService.depositAccountTransfer(request);
		return ResponseEntity.ok(result);
	}
}
