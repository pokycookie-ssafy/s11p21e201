package com.e201.client.controller.ocr;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e201.client.controller.ocr.response.LicenseCreateResponse;
import com.e201.client.service.ocr.OcrService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OcrController {

	private final OcrService ocrService;

	@PostMapping("/ocr/license")
	public ResponseEntity<LicenseCreateResponse> ocrCallApi(MultipartFile image) {
		LicenseCreateResponse response = ocrService.ocrCallApi(image);
		return ResponseEntity.status(OK).body(response);
	}

}
