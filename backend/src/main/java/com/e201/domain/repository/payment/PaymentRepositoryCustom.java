package com.e201.domain.repository.payment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.e201.api.controller.dashboard.response.CompanyMonthlyPaymentSumResponse;
import com.e201.api.controller.dashboard.response.StorePaymentSumResponse;
import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;

public interface PaymentRepositoryCustom {
	Page<EmployeeTotalPaymentResponse> findEmployeeTotalPayments(UUID companyId, UUID departmentId,
		LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

	EmployeePaymentResponse findEmployeePayments(UUID employeeId, LocalDateTime startDate, LocalDateTime endDate,
		Pageable pageable);

	List<CompanyMonthlyPaymentSumResponse> findMonthlySumByCompany(UUID companyId, UUID departmentId,
		LocalDateTime startDate, LocalDateTime endDate);

	List<StorePaymentSumResponse> findMonthlySumByStore(UUID companyId, UUID departmentId, LocalDateTime startDate,
		LocalDateTime endDate);
}
