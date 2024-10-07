package com.e201.api.controller.company;

import static com.e201.global.exception.ErrorCode.*;
import static com.e201.global.security.auth.constant.AuthConstant.*;
import static com.e201.global.security.auth.constant.RoleType.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.e201.global.exception.ErrorCode;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.exception.AuthenticationException;
import com.e201.global.security.auth.exception.AuthorizationException;

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

	@GetMapping("/companies/auth")
	public ResponseEntity<CompanyAuthResponse> authCompanyCheck(HttpServletRequest httpRequest) {
		checkSession(httpRequest);
		Object session = httpRequest.getSession().getAttribute(AUTH_INFO.name());
		CompanyAuthResponse response = checkCompanyAuth(session);
		return ResponseEntity.status(OK).body(response);
	}

	@GetMapping("/companies/managers/auth")
	public ResponseEntity<ManagerAuthResponse> authManagerCheck(HttpServletRequest httpRequest) {
		checkSession(httpRequest);
		Object session = httpRequest.getSession().getAttribute(AUTH_INFO.name());
		ManagerAuthResponse response = checkManagerAuth(session);
		return ResponseEntity.status(OK).body(response);
	}

	@GetMapping("/companies/employees/auth")
	public ResponseEntity<EmployeeAuthResponse> authEmployeeCheck(HttpServletRequest httpRequest) {
		checkSession(httpRequest);
		Object session = httpRequest.getSession().getAttribute(AUTH_INFO.name());
		EmployeeAuthResponse response = checkEmployeeAuth(session);
		return ResponseEntity.status(OK).body(response);
	}

	private void checkSession(HttpServletRequest httpRequest) {
		if(httpRequest.getSession().getAttribute(AUTH_INFO.name()) == null) {
			throw new AuthenticationException(AUTHENTICATION_FAILED, "세션 만료");
		}
	}

	private CompanyAuthResponse checkCompanyAuth(Object session) {
		CompanyAuthResponse response = null;
		if(session instanceof AuthInfo authInfo) {
			validateRoletype(authInfo, COMPANY);
			response = new CompanyAuthResponse(authInfo.getId());
		}
		return response;
	}

	private ManagerAuthResponse checkManagerAuth(Object session) {
		ManagerAuthResponse response = null;
		if(session instanceof AuthInfo authInfo) {
			validateRoletype(authInfo, MANAGER);
			response = managerService.findAuth(((AuthInfo)session).getId());
		}
		return response;
	}
	private EmployeeAuthResponse checkEmployeeAuth(Object session) {
		EmployeeAuthResponse response = null;
		if(session instanceof AuthInfo authInfo) {
			validateRoletype(authInfo, EMPLOYEE);
			response = employeeService.findAuth(((AuthInfo)session).getId());
		}
		return response;
	}

	private void validateRoletype(AuthInfo authInfo, RoleType roleType) {
		if (!authInfo.getRoleType().equals(roleType)) {
			throw new AuthorizationException(ErrorCode.AUTHORIZATION_FAILED, "접근 권한이 없습니다.");
		}
	}
}
