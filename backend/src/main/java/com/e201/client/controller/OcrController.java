package com.e201.client.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
import com.e201.client.controller.response.LicenseCreateResponse;
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
import com.e201.client.service.OcrService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OcrController {

	private final OcrService ocrService;

<<<<<<< HEAD
	@PostMapping("/ocr/license")
	public ResponseEntity<LicenseCreateResponse> ocrCallApi(MultipartFile image) {
		LicenseCreateResponse response = ocrService.ocrCallApi(image);
		return ResponseEntity.status(OK).body(response);
	}

=======
	@PostMapping("/licenses")
	public ResponseEntity<OcrResultResponse> parseBizLicense(MultipartFile file) {
		OcrResultResponse response = ocrService.parseBizLicense(file);
		return ResponseEntity.status(OK).body(response);
	}
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
}
