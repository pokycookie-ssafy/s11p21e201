package com.e201.domain.repository.payment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e201.api.controller.dashboard.response.DepartmentPaymentSumResponse;
import com.e201.api.controller.dashboard.response.EmployeePaymentSumResponse;
import com.e201.api.controller.payment.response.PaymentAndMenusFindResponse;
import com.e201.domain.entity.payment.Payment;
import com.e201.global.quartz.dto.PaymentDailySumDto;

public interface PaymentRepository extends JpaRepository<Payment, UUID>, PaymentRepositoryCustom {

	@Query("select new com.e201.global.quartz.dto.PaymentDailySumDto(p.contractId, SUM(p.amount))"
		+ " from Payment p"
		+ " where p.createdAt"
		+ " between :startDate and :endDate"
		+ " group by p.contractId")
	List<PaymentDailySumDto> sumByContractId(LocalDateTime startDate, LocalDateTime endDate);

	@Query("select SUM(p.amount)"
		+ " from Payment p"
		+ " where p.employeeId = :employeeId"
		+ " and p.createdAt between :startDate and :endDate"
		+ " group by p.employeeId")
	Long findUsageByEmployeeId(UUID employeeId, LocalDateTime startDate, LocalDateTime endDate);

	@Query(
		"select new com.e201.api.controller.payment.response.PaymentAndMenusFindResponse(p.id, p.storeId, p.storeName, p.amount, p.paymentDate)"
			+ " from Payment p"
			+ " where p.employeeId = :employeeId"
			+ " and p.createdAt between :startDate and :endDate")
	List<PaymentAndMenusFindResponse> findPaymentAndMenus(UUID employeeId, LocalDateTime startDate,
		LocalDateTime endDate);

	@Query(
		"select new com.e201.api.controller.dashboard.response.DepartmentPaymentSumResponse(p.departmentId, p.departmentName, SUM(p.amount))"
			+ " from Payment p"
			+ " where p.companyId = :companyId"
			+ " and p.createdAt between :startDate and :endDate"
			+ " group by p.departmentId")
	List<DepartmentPaymentSumResponse> findMonthlySumByDepartment(UUID companyId, LocalDateTime startDate,
		LocalDateTime endDate);

	@Query(
		"select new com.e201.api.controller.dashboard.response.DepartmentPaymentSumResponse(p.employeeId, p.employeeName, SUM(p.amount))"
			+ " from Payment p"
			+ " where p.departmentId = :departmentId"
			+ " and p.createdAt between :startDate and :endDate"
			+ " group by p.employeeId")
	List<EmployeePaymentSumResponse> findMonthlySumByEmployee(UUID departmentId, LocalDateTime startDate,
		LocalDateTime endDate);
}
