package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.DepartmentCreateRequest;
import com.e201.api.controller.company.request.EmployeeCreateRequest;
import com.e201.api.controller.company.response.DepartmentCreateResponse;
import com.e201.api.controller.company.response.EmployeeCreateResponse;
import com.e201.api.service.company.DepartmentService;
import com.e201.api.service.company.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

	private final EmployeeService employeeService;

	@PostMapping("/companies/employees")
	public ResponseEntity<EmployeeCreateResponse> create(@RequestBody EmployeeCreateRequest request) {
		// TODO <jhl221123> 관리자 계정만 생성 가능
		EmployeeCreateResponse response = employeeService.create(request);
		return ResponseEntity.status(CREATED).body(response);
	}
}
