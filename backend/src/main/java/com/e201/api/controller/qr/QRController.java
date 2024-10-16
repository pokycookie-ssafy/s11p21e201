package com.e201.api.controller.qr;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.store.request.QRValidationRequest;
import com.e201.api.service.qr.QRService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class QRController {
	private final QRService qrService;
	@PostMapping("employees/qr")
	public ResponseEntity<Void> createQR(@Auth AuthInfo authInfo, QRValidationRequest qrValidationRequest){
		qrService.create(authInfo.getRoleType(), qrValidationRequest);
	return ResponseEntity.ok().build();
	}
}
