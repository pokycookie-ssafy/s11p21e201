package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.controller.company.response.employee.EmployeeFindResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

	private final EmployeeService employeeService;

	@PostMapping("/companies/employees")
	public ResponseEntity<EmployeeCreateResponse> create(@Auth AuthInfo authInfo,
		@RequestBody EmployeeCreateRequest request) {
		EmployeeCreateResponse response = employeeService.create(request, authInfo.getId());
		return ResponseEntity.status(CREATED).body(response);
	}

	@GetMapping("/companies/employees")
	public ResponseEntity<Page<EmployeeFindResponse>> findPage(@RequestParam(required = false) UUID departmentId,
		Pageable pageable) {
		Page<EmployeeFindResponse> response = employeeService.findPage(departmentId, pageable);
		return ResponseEntity.ok(response);
	}
}
