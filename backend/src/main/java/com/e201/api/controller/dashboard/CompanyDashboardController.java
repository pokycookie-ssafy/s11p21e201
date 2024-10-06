package com.e201.api.controller.dashboard;

import static com.e201.global.security.auth.constant.RoleType.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.dashboard.request.DashboardPeriodRequest;
import com.e201.api.controller.dashboard.response.CompanyMonthlyPaymentSumResponse;
import com.e201.api.controller.dashboard.response.DepartmentPaymentSumResponse;
import com.e201.api.controller.dashboard.response.EmployeePaymentSumResponse;
import com.e201.api.controller.dashboard.response.StorePaymentSumResponse;
import com.e201.api.service.payment.PaymentService;
import com.e201.global.exception.ErrorCode;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.exception.AuthorizationException;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CompanyDashboardController {

	private final PaymentService paymentService;

	@GetMapping("/companies/dashboards/years/months")
	public ResponseEntity<List<CompanyMonthlyPaymentSumResponse>> findAnnualTrend(@Auth AuthInfo authInfo,
		@ModelAttribute DashboardPeriodRequest request) {
		return ResponseEntity.ok().body(paymentService.findAnnualTrendByCompany(authInfo, request));
	}

	@GetMapping("/companies/dashboards/months/departments")
	public ResponseEntity<List<DepartmentPaymentSumResponse>> findMonthlyPaymentSumByDepartment(@Auth AuthInfo authInfo,
		@ModelAttribute DashboardPeriodRequest request) {
		validateRoleType(authInfo, COMPANY);
		return ResponseEntity.ok().body(paymentService.findMonthlySumByDepartment(authInfo.getId(), request));
	}

	@GetMapping("/companies/dashboards/months/employees")
	public ResponseEntity<List<EmployeePaymentSumResponse>> findMonthlyPaymentSumByEmployee(@Auth AuthInfo authInfo,
		@ModelAttribute DashboardPeriodRequest request) {
		validateRoleType(authInfo, MANAGER);
		return ResponseEntity.ok().body(paymentService.findMonthlySumByEmployee(authInfo.getId(), request));
	}

	@GetMapping("/companies/dashboards/months/stores")
	public ResponseEntity<List<StorePaymentSumResponse>> findMonthlyPaymentSumByStore(@Auth AuthInfo authInfo,
		@ModelAttribute DashboardPeriodRequest request) {
		return ResponseEntity.ok().body(paymentService.findMonthlySumByStore(authInfo, request));
	}

	private void validateRoleType(AuthInfo authInfo, RoleType roleType) {
		if (!authInfo.getRoleType().equals(roleType)) {
			throw new AuthorizationException(ErrorCode.AUTHORIZATION_FAILED, "접근 권한이 없습니다.");
		}
	}
}
