package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.CompanyCreateRequest;
import com.e201.api.controller.company.request.DepartmentCreateRequest;
import com.e201.api.controller.company.response.CompanyCreateResponse;
import com.e201.api.controller.company.response.DepartmentCreateResponse;
import com.e201.api.service.company.CompanyService;
import com.e201.api.service.company.DepartmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DepartmentController {

	private final DepartmentService departmentService;

	@PostMapping("/companies/departments")
	public ResponseEntity<DepartmentCreateResponse> create(@RequestBody DepartmentCreateRequest request) {
		// TODO <jhl221123> 기업 메인 계정만 생성 가능
		DepartmentCreateResponse response = departmentService.create(request);
		return ResponseEntity.status(CREATED).body(response);
	}
}
