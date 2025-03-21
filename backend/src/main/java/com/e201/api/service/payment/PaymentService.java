package com.e201.api.service.payment;

import static com.e201.global.security.auth.constant.RoleType.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.employee.EmployeeUsageRequest;
import com.e201.api.controller.company.response.employee.EmployeeUsageResponse;
import com.e201.api.controller.dashboard.request.DashboardPeriodRequest;
import com.e201.api.controller.dashboard.response.CompanyDailyPaymentSumResponse;
import com.e201.api.controller.dashboard.response.CompanyMonthlyPaymentSumResponse;
import com.e201.api.controller.dashboard.response.DepartmentPaymentSumResponse;
import com.e201.api.controller.dashboard.response.EmployeePaymentSumResponse;
import com.e201.api.controller.dashboard.response.StorePaymentSumResponse;
import com.e201.api.controller.payment.request.EmployeePaymentCondition;
import com.e201.api.controller.payment.request.EmployeeTotalPaymentCondition;
import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;
import com.e201.api.controller.payment.response.PaymentAndMenusFindResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.company.ManagerService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.payment.Payment;
import com.e201.domain.entity.store.Sales;
import com.e201.domain.entity.store.Store;
import com.e201.domain.repository.payment.PaymentRepository;
import com.e201.domain.repository.store.SalesRepository;
import com.e201.global.security.auth.dto.AuthInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class PaymentService {

	private final PaymentRepository paymentRepository;
	private final ManagerService managerService;
	private final EmployeeService employeeService;
	private final SalesRepository salesRepository;

	public Payment findEntity(UUID id) {
		return paymentRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public Page<EmployeeTotalPaymentResponse> findEmployeeTotalPayments(AuthInfo authInfo,
		EmployeeTotalPaymentCondition condition, Pageable pageable) {
		UUID companyId = authInfo.getRoleType().equals(COMPANY) ? authInfo.getId() : null;
		return paymentRepository.findEmployeeTotalPayments(companyId, condition.getDepartmentId(),
			condition.getStartDate(), condition.getEndDate(), pageable);
	}

	public Long findUsageByEmployee(UUID employeeId, LocalDateTime startDate, LocalDateTime endDate) {
		return paymentRepository.findUsageByEmployeeId(employeeId, startDate, endDate);
	}

	public EmployeeUsageResponse findUsage(AuthInfo authInfo, EmployeeUsageRequest request) {
		UUID employeeId = authInfo.getId();
		Employee employee = employeeService.findEntity(employeeId);
		Long usage = findUsageByEmployee(employeeId, request.getStartDate(), request.getEndDate());
		return EmployeeUsageResponse
			.builder()
			.supportAmount(employee.getSupportAmount())
			.usage(usage)
			.build();
	}

	public List<PaymentAndMenusFindResponse> findPaymentAndMenusByEmployee(UUID employeeId, LocalDateTime startDate,
		LocalDateTime endDate) {
		return paymentRepository.findPaymentAndMenus(employeeId, startDate, endDate);
	}

	public List<PaymentAndMenusFindResponse> findUserPaymentDetails(AuthInfo authInfo, EmployeeUsageRequest request) {
		UUID employeeId = authInfo.getId();
		List<PaymentAndMenusFindResponse> responses = findPaymentAndMenusByEmployee(employeeId, request.getStartDate(),
			request.getEndDate());

		responses.forEach(p -> {
			UUID paymentId = p.getId();
			List<Sales> sales = salesRepository.findByPaymentId(paymentId);

			sales.forEach(s -> {
				p.addMenus(s.getMenu());
			});
		});

		return responses;
	}

	public EmployeePaymentResponse findEmployeePayments(UUID employeeId, EmployeePaymentCondition condition,
		Pageable pageable) {
		return paymentRepository.findEmployeePayments(employeeId, condition.getStartDate(),
			condition.getEndDate(), pageable);
	}

	public List<CompanyMonthlyPaymentSumResponse> findAnnualTrendMonthly(AuthInfo authInfo,
		DashboardPeriodRequest request) {
		UUID companyId = authInfo.getRoleType().equals(COMPANY) ? authInfo.getId() : null;
		UUID departmentId = authInfo.getRoleType().equals(MANAGER) ?
			managerService.findEntity(authInfo.getId()).getDepartment().getId() : null;
		return paymentRepository.findMonthlySumByCompany(companyId, departmentId, request.getStartDate(),
			request.getEndDate());
	}

	public List<CompanyDailyPaymentSumResponse> findAnnualTrendDaily(AuthInfo authInfo,
		DashboardPeriodRequest request) {
		UUID companyId = authInfo.getRoleType().equals(COMPANY) ? authInfo.getId() : null;
		UUID departmentId = authInfo.getRoleType().equals(MANAGER) ?
			managerService.findEntity(authInfo.getId()).getDepartment().getId() : null;
		return paymentRepository.findDailySumByCompany(companyId, departmentId, request.getStartDate(),
			request.getEndDate());
	}

	public List<DepartmentPaymentSumResponse> findMonthlySumByDepartment(UUID companyId,
		DashboardPeriodRequest request) {
		return paymentRepository.findMonthlySumByDepartment(companyId, request.getStartDate(), request.getEndDate());
	}

	public List<EmployeePaymentSumResponse> findMonthlySumByEmployee(UUID managerId, DashboardPeriodRequest request) {
		UUID departmentId = managerService.findEntity(managerId).getDepartment().getId();
		return paymentRepository.findMonthlySumByEmployee(departmentId, request.getStartDate(), request.getEndDate());
	}

	public List<StorePaymentSumResponse> findMonthlySumByStore(AuthInfo authInfo, DashboardPeriodRequest request) {
		UUID companyId = authInfo.getRoleType().equals(COMPANY) ? authInfo.getId() : null;
		UUID departmentId = authInfo.getRoleType().equals(MANAGER) ?
			managerService.findEntity(authInfo.getId()).getDepartment().getId() : null;
		return paymentRepository.findMonthlySumByStore(companyId, departmentId, request.getStartDate(),
			request.getEndDate());
	}

	public Payment save(UUID contractId, UUID employeeId, Store store, Long totalAmount) {
		Employee employee = employeeService.findEntity(employeeId);
		Payment payment = Payment.builder()
			.contractId(contractId)
			.companyId(employee.getDepartment().getCompany().getId())
			.departmentId(employee.getDepartment().getId())
			.departmentName(employee.getDepartment().getName())
			.employeeId(employeeId)
			.employeeName(employee.getName())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.amount(totalAmount)
			.paymentDate(LocalDateTime.now())
			.build();
		paymentRepository.save(payment);
		return payment;
	}

}
