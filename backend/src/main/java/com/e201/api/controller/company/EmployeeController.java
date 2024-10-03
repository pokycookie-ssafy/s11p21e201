package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public ResponseEntity<List<EmployeeFindResponse>> findPage(@Auth AuthInfo authInfo) {
		List<EmployeeFindResponse> response = employeeService.findAll(authInfo);
		return ResponseEntity.ok(response);
	}
}
