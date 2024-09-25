package com.e201.api.controller.contract;

import static org.springframework.http.HttpStatus.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e201.api.controller.contract.response.InvoiceCreateResponse;
import com.e201.api.controller.contract.response.InvoiceDownloadResponse;
import com.e201.api.service.contract.InvoiceService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class InvoiceController {

	private final InvoiceService invoiceService;

	@PostMapping("/invoice/upload")
	public ResponseEntity<InvoiceCreateResponse> upload(@Auth AuthInfo authInfo, MultipartFile uploadFile,
		@RequestParam String contractId) {
		InvoiceCreateResponse response = invoiceService.create(uploadFile, contractId);
		return ResponseEntity.status(OK).body(response);
	}

	@GetMapping("/invoice/download/{invoiceId}")
	public ResponseEntity<Resource> download(@Auth AuthInfo authInfo, @PathVariable String invoiceId) throws
		IOException {

		InvoiceDownloadResponse response = invoiceService.find(invoiceId);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentDisposition(
			ContentDisposition.builder("attachment")
				.filename(response.getFileName(), StandardCharsets.UTF_8)
				.build());
		headers.add(HttpHeaders.CONTENT_TYPE, response.getContentType());

		Resource resource = response.getResource();

		return ResponseEntity.status(OK).headers(headers).body(resource);
	}

	@DeleteMapping("/invoices/{invoiceId}")
	public ResponseEntity<Object> delete(@Auth AuthInfo authInfo, @PathVariable String invoiceId) {
		invoiceService.delete(invoiceId);
		return ResponseEntity.status(NO_CONTENT).build();
	}
}
