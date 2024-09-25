package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.manager.ManagerCreateRequest;
import com.e201.api.controller.company.response.manager.ManagerCreateResponse;
import com.e201.api.service.company.ManagerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ManagerController {

	private final ManagerService managerService;

	@PostMapping("/companies/managers")
	public ResponseEntity<ManagerCreateResponse> create(@RequestBody ManagerCreateRequest request) {
		ManagerCreateResponse response = managerService.create(request);
		return ResponseEntity.status(CREATED).body(response);
	}
}
