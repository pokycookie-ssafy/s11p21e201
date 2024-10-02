package com.e201.api.service.payment;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.e201.api.controller.payment.request.EmployeePaymentCondition;
import com.e201.api.controller.payment.request.EmployeeTotalPaymentCondition;
import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.payment.Payment;
import com.e201.domain.repository.payment.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class PaymentService {

	private final PaymentRepository paymentRepository;

	public Payment findEntity(UUID id) {
		return paymentRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public Page<EmployeeTotalPaymentResponse> findEmployeeTotalPayments(UUID companyId,
		EmployeeTotalPaymentCondition condition,
		Pageable pageable) {
		return paymentRepository.findEmployeeTotalPayments(companyId, condition.getDepartmentId(),
			condition.getStartDate(), condition.getEndDate(), pageable);
	}

	public EmployeePaymentResponse findEmployeePayments(EmployeePaymentCondition condition, Pageable pageable) {
		return paymentRepository.findEmployeePayments(condition.getEmployeeId(), condition.getStartDate(),
			condition.getEndDate(), pageable);
	}
}
