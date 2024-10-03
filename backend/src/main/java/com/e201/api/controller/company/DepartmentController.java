package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.department.DepartmentCreateRequest;
import com.e201.api.controller.company.response.department.DepartmentCreateResponse;
import com.e201.api.controller.company.response.department.DepartmentFindResponse;
import com.e201.api.service.company.DepartmentService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DepartmentController {

	private final DepartmentService departmentService;

	@PostMapping("/companies/departments")
	public ResponseEntity<DepartmentCreateResponse> create(@Auth AuthInfo authInfo,
		@RequestBody DepartmentCreateRequest request) {
		UUID companyId = authInfo.getId();
		DepartmentCreateResponse response = departmentService.create(request, companyId);
		return ResponseEntity.status(CREATED).body(response);
	}

	@GetMapping("/companies/departments")
	public ResponseEntity<List<DepartmentFindResponse>> find(@Auth AuthInfo authInfo) {
		UUID companyId = authInfo.getId();
		List<DepartmentFindResponse> response = departmentService.findAllByCompanyId(companyId);
		return ResponseEntity.ok(response);
	}
}
