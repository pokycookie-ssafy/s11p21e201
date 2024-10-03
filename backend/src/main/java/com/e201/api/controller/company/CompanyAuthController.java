package com.e201.api.controller.company;

import static com.e201.global.security.auth.constant.AuthConstant.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.company.request.company.CompanyAuthRequest;
import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.manager.ManagerAuthRequest;
import com.e201.api.controller.company.response.company.CompanyAuthResponse;
import com.e201.api.controller.company.response.employee.EmployeeAuthResponse;
import com.e201.api.controller.company.response.manager.ManagerAuthResponse;
import com.e201.api.service.company.CompanyService;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.company.ManagerService;
import com.e201.global.security.auth.dto.AuthInfo;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CompanyAuthController {

	private final CompanyService companyService;
	private final ManagerService managerService;
	private final EmployeeService employeeService;

	@PostMapping("/companies/auth")
	public ResponseEntity<CompanyAuthResponse> authCompany(@RequestBody CompanyAuthRequest request,
		HttpServletRequest httpRequest) {
		AuthInfo authInfo = companyService.checkPassword(request);
		httpRequest.getSession().setAttribute(AUTH_INFO.name(), authInfo);
		return ResponseEntity.status(CREATED).body(new CompanyAuthResponse(authInfo.getId()));
	}

	@PostMapping("/companies/managers/auth")
	public ResponseEntity<ManagerAuthResponse> authManager(@RequestBody ManagerAuthRequest request,
		HttpServletRequest httpRequest) {
		AuthInfo authInfo = managerService.checkPassword(request);
		httpRequest.getSession().setAttribute(AUTH_INFO.name(), authInfo);
		ManagerAuthResponse authResponse = managerService.findAuth(authInfo.getId());
		return ResponseEntity.status(CREATED).body(authResponse);
	}

	@PostMapping("/companies/employees/auth")
	public ResponseEntity<EmployeeAuthResponse> authEmployee(@RequestBody EmployeeAuthRequest request,
		HttpServletRequest httpRequest) {
		AuthInfo authInfo = employeeService.checkPassword(request);
		httpRequest.getSession().setAttribute(AUTH_INFO.name(), authInfo);
		EmployeeAuthResponse authResponse = employeeService.findAuth(authInfo.getId());
		return ResponseEntity.status(CREATED).body(authResponse);
	}
}
