package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.CompanyCreateRequest;
import com.e201.api.controller.company.request.CompanyInfoCreateRequest;
import com.e201.api.controller.company.response.CompanyCreateResponse;
import com.e201.api.controller.company.response.CompanyInfoCreateResponse;
import com.e201.api.service.company.CompanyInfoService;
import com.e201.api.service.company.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CompanyInfoController {

	private final CompanyInfoService companyInfoService;

	@PostMapping("/companies/info")
	public ResponseEntity<CompanyInfoCreateResponse> create(@RequestBody CompanyInfoCreateRequest request) {
		CompanyInfoCreateResponse response = companyInfoService.create(request);
		return ResponseEntity.status(CREATED).body(response);
	}
}
