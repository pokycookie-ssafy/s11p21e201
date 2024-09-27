package com.e201.client.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e201.client.controller.response.OcrResultResponse;
import com.e201.client.service.OcrService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OcrController {

	private final OcrService ocrService;

	@PostMapping("/licenses")
	public ResponseEntity<OcrResultResponse> parseBizLicense(MultipartFile file) {
		OcrResultResponse response = ocrService.parseBizLicense(file);
		return ResponseEntity.status(OK).body(response);
	}
}
