package com.e201.api.controller.company;

import static com.e201.global.security.auth.constant.RoleType.*;
import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.request.employee.EmployeePasswordRequest;
import com.e201.api.controller.company.request.employee.EmployeeUsageRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.controller.company.response.employee.EmployeeFindResponse;
import com.e201.api.controller.company.response.employee.EmployeeUsageResponse;
import com.e201.api.controller.payment.response.PaymentAndMenusFindResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.payment.PaymentService;
import com.e201.global.exception.ErrorCode;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.exception.AuthorizationException;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

	private final EmployeeService employeeService;
	private final PaymentService paymentService;

	@PostMapping("/companies/employees")
	public ResponseEntity<EmployeeCreateResponse> create(@Auth AuthInfo authInfo,
		@RequestBody EmployeeCreateRequest request) {
		validateRoleType(authInfo, MANAGER);
		EmployeeCreateResponse response = employeeService.create(request, authInfo.getId());
		return ResponseEntity.status(CREATED).body(response);
	}

	@GetMapping("/companies/employees")
	public ResponseEntity<List<EmployeeFindResponse>> findPage(@Auth AuthInfo authInfo) {
		List<EmployeeFindResponse> response = employeeService.findAll(authInfo);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/companies/employees/usages")
	public ResponseEntity<EmployeeUsageResponse> findUsage(@Auth AuthInfo authInfo,
		@ModelAttribute EmployeeUsageRequest request) {
		validateRoleType(authInfo, EMPLOYEE);
		EmployeeUsageResponse response = paymentService.findUsage(authInfo, request);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/companies/employees/usages/detail")
	public ResponseEntity<List<PaymentAndMenusFindResponse>> findUsageDetail(@Auth AuthInfo authInfo,
		@ModelAttribute EmployeeUsageRequest request) {
		validateRoleType(authInfo, EMPLOYEE);
		List<PaymentAndMenusFindResponse> response = paymentService.findUserPaymentDetails(authInfo, request);
		return ResponseEntity.ok(response);
	}

	@PutMapping("/companies/employees/password")
	public ResponseEntity<Void> changePassword(@Auth AuthInfo authInfo, @RequestBody EmployeePasswordRequest request) {
		validateRoleType(authInfo, EMPLOYEE);
		employeeService.changePassword(authInfo.getId(), request);
		return ResponseEntity.status(OK).build();
	}

	private void validateRoleType(AuthInfo authInfo, RoleType roleType) {
		if (!authInfo.getRoleType().equals(roleType)) {
			throw new AuthorizationException(ErrorCode.AUTHORIZATION_FAILED, "접근 권한이 없습니다.");
		}
	}
}
