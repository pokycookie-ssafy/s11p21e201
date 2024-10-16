package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.company.CompanyCreateRequest;
import com.e201.api.controller.company.response.company.CompanyCreateResponse;
import com.e201.api.service.company.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CompanyController {

	private final CompanyService companyService;

	@PostMapping("/companies")
	public ResponseEntity<CompanyCreateResponse> create(@RequestBody CompanyCreateRequest request) {
		CompanyCreateResponse response = companyService.create(request);
		return ResponseEntity.status(CREATED).body(response);
	}
}
