package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.EmployeeCreateRequest;
import com.e201.api.controller.company.request.ManagerCreateRequest;
import com.e201.api.controller.company.response.EmployeeCreateResponse;
import com.e201.api.controller.company.response.ManagerCreateResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.company.ManagerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ManagerController {

	private final ManagerService managerService;

	@PostMapping("/companies/managers")
	public ResponseEntity<ManagerCreateResponse> create(@RequestBody ManagerCreateRequest request) {
		// TODO <jhl221123> 관리자 계정만 생성 가능
		ManagerCreateResponse response = managerService.create(request);
		return ResponseEntity.status(CREATED).body(response);
	}
}
