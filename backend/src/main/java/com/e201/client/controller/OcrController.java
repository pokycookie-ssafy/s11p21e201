package com.e201.client.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e201.client.controller.response.LicenseCreateResponse;
import com.e201.client.controller.response.LicenseReadResponse;
import com.e201.client.service.OcrService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OcrController {

	private final OcrService ocrService;

	@PostMapping("/licenses/signup")
	public ResponseEntity<LicenseCreateResponse> ocrForSignup(MultipartFile file) {
		LicenseCreateResponse response = ocrService.ocrForSignup(file);
		return ResponseEntity.status(OK).body(response);
	}

	@PostMapping("/licenses/contract")
	public ResponseEntity<LicenseReadResponse> ocrForContract(@Auth AuthInfo authInfo, MultipartFile file) {
		LicenseReadResponse response = ocrService.ocrForContract(authInfo, file);
		return ResponseEntity.status(OK).body(response);
	}


}
