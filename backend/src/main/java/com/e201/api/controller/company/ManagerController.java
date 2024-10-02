package com.e201.api.controller.company;

import static org.springframework.http.HttpStatus.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.manager.ManagerCreateRequest;
import com.e201.api.controller.company.response.manager.ManagerCreateResponse;
import com.e201.api.controller.company.response.manager.ManagerFindResponse;
import com.e201.api.service.company.ManagerService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

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

	@GetMapping("/companies/managers")
	public ResponseEntity<Page<ManagerFindResponse>> findPage(@Auth AuthInfo authInfo, Pageable pageable) {
		Page<ManagerFindResponse> response = managerService.findPage(authInfo.getId(), pageable);
		return ResponseEntity.ok(response);
	}
}
