package com.e201.client.controller.ocr;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD:backend/src/main/java/com/e201/client/controller/OcrController.java
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.client.controller.response.LicenseCreateResponse;
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
import com.e201.client.controller.response.LicenseCreateResponse;
import com.e201.client.controller.response.LicenseReadResponse;
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
import com.e201.client.service.OcrService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;
=======
import com.e201.client.controller.ocr.response.LicenseCreateResponse;
import com.e201.client.service.ocr.OcrService;
>>>>>>> 603930d ([#41] feat: 싸피 금융망 API 연동완료):backend/src/main/java/com/e201/client/controller/ocr/OcrController.java

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OcrController {

	private final OcrService ocrService;

<<<<<<< HEAD
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
=======
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


>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
}
