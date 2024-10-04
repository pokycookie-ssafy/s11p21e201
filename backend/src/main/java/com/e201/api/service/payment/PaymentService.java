package com.e201.api.service.payment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.employee.EmployeeUsageRequest;
import com.e201.api.controller.company.response.employee.EmployeeUsageResponse;
import com.e201.api.controller.payment.request.EmployeePaymentCondition;
import com.e201.api.controller.payment.request.EmployeeTotalPaymentCondition;
import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;
import com.e201.api.controller.payment.response.PaymentAndMenusFindResponse;
import com.e201.api.service.company.EmployeeService;
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
	private final EmployeeService employeeService;
	private final SalesRepository salesRepository;

	public Payment findEntity(UUID id) {
		return paymentRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public Page<EmployeeTotalPaymentResponse> findEmployeeTotalPayments(UUID companyId,
		EmployeeTotalPaymentCondition condition, Pageable pageable) {
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

	public Payment save(UUID contractId, UUID employeeId, Store store, Long totalAmount) {
		Payment payment = Payment.builder()
			.contractId(contractId)
			.employeeId(employeeId)
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.amount(totalAmount)
			.paymentDate(LocalDateTime.now())
			.build();
		paymentRepository.save(payment);
		return payment;
	}

}
