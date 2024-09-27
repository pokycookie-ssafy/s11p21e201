package com.e201.client.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.client.controller.response.LicenseCreateResponse;
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
import com.e201.client.service.OcrService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OcrController {

	private final OcrService ocrService;

<<<<<<< HEAD
<<<<<<< HEAD
	@PostMapping("/ocr/license")
	public ResponseEntity<LicenseCreateResponse> ocrCallApi(MultipartFile image) {
		LicenseCreateResponse response = ocrService.ocrCallApi(image);
		return ResponseEntity.status(OK).body(response);
	}

=======
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
	@PostMapping("/licenses")
	public ResponseEntity<OcrResultResponse> parseBizLicense(MultipartFile file) {
		OcrResultResponse response = ocrService.parseBizLicense(file);
		return ResponseEntity.status(OK).body(response);
	}
<<<<<<< HEAD
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
}
