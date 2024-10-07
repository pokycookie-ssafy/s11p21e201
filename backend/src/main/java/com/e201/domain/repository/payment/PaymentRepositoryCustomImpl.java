package com.e201.domain.repository.payment;

import static com.e201.domain.entity.company.QCompany.*;
import static com.e201.domain.entity.company.QDepartment.*;
import static com.e201.domain.entity.company.QEmployee.*;
import static com.e201.domain.entity.payment.QPayment.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import com.e201.api.controller.dashboard.response.CompanyDailyPaymentSumResponse;
import com.e201.api.controller.dashboard.response.CompanyMonthlyPaymentSumResponse;
import com.e201.api.controller.dashboard.response.StorePaymentSumResponse;
import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeSpentAmount;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;
import com.e201.api.controller.payment.response.PaymentFindResponse;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.payment.Payment;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class PaymentRepositoryCustomImpl implements PaymentRepositoryCustom {

	private final JPAQueryFactory companyQueryFactory;
	private final JPAQueryFactory paymentQueryFactory;

	public PaymentRepositoryCustomImpl(
		@Qualifier("companyJpaQueryFactory") JPAQueryFactory companyQueryFactory,
		@Qualifier("paymentJpaQueryFactory") JPAQueryFactory paymentQueryFactory) {
		this.companyQueryFactory = companyQueryFactory;
		this.paymentQueryFactory = paymentQueryFactory;
	}

	@Override
	public Page<EmployeeTotalPaymentResponse> findEmployeeTotalPayments(UUID companyId, UUID departmentId,
		LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
		List<Employee> employees = findEmployees(companyId, departmentId, pageable);
		List<UUID> employeeIds = getEmployeeIds(employees);
		List<EmployeeSpentAmount> spentAmounts = sumEmployeeSpentAmount(startDate, endDate, employeeIds);
		List<EmployeeTotalPaymentResponse> responses = createEmployeePaymentResponses(employees, spentAmounts);
		JPAQuery<Long> countQuery = createCountQuery(companyId, departmentId);
		return PageableExecutionUtils.getPage(responses, pageable, countQuery::fetchFirst);
	}

	@Override
	public EmployeePaymentResponse findEmployeePayments(UUID employeeId, LocalDateTime startDate,
		LocalDateTime endDate, Pageable pageable) {

		// 대상 직원 조회
		Employee findEmployee = companyQueryFactory
			.selectFrom(employee)
			.join(employee.department, department).fetchJoin()
			.where(employee.id.eq(employeeId))
			.fetchFirst();

		// 직원의 결제 내역 페이지 조회
		List<Payment> payments = paymentQueryFactory
			.selectFrom(payment)
			.where(payment.employeeId.eq(findEmployee.getId()))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
		List<PaymentFindResponse> content = payments.stream().map(PaymentFindResponse::of).toList();

		JPAQuery<Long> countQuery = paymentQueryFactory
			.select(payment.count())
			.from(payment)
			.where(payment.employeeId.eq(findEmployee.getId()));

		Page<PaymentFindResponse> paymentPage = PageableExecutionUtils.getPage(content, pageable,
			countQuery::fetchFirst);

		return EmployeePaymentResponse.builder()
			.employeeId(findEmployee.getId())
			.employeeName(findEmployee.getName())
			.employeeCode(findEmployee.getCode())
			.departmentId(findEmployee.getDepartment().getId())
			.departmentName(findEmployee.getDepartment().getName())
			.payments(paymentPage)
			.build();
	}

	@Override
	public List<CompanyMonthlyPaymentSumResponse> findMonthlySumByCompany(UUID companyId, UUID departmentId,
		LocalDateTime startDate, LocalDateTime endDate) {
		return paymentQueryFactory
			.select(Projections.constructor(CompanyMonthlyPaymentSumResponse.class,
				payment.paymentDate.year(),
				payment.paymentDate.month(),
				payment.amount.sum()
			))
			.from(payment)
			.where(
				payment.paymentDate.between(startDate, endDate),
				matchCompany(companyId),
				matchDepartment(departmentId)
			)
			.groupBy(payment.paymentDate.year(), payment.paymentDate.month())
			.orderBy(payment.paymentDate.year().asc(), payment.paymentDate.month().asc())
			.fetch();
	}

	@Override
	public List<CompanyDailyPaymentSumResponse> findDailySumByCompany(UUID companyId, UUID departmentId,
		LocalDateTime startDate, LocalDateTime endDate) {
		return paymentQueryFactory
			.select(Projections.constructor(CompanyDailyPaymentSumResponse.class,
				payment.paymentDate.year(),
				payment.paymentDate.month(),
				payment.paymentDate.dayOfMonth(),
				payment.amount.sum()
			))
			.from(payment)
			.where(
				payment.paymentDate.between(startDate, endDate),
				matchCompany(companyId),
				matchDepartment(departmentId)
			)
			.groupBy(
				payment.paymentDate.year(),
				payment.paymentDate.month(),
				payment.paymentDate.dayOfMonth()
			)
			.orderBy(
				payment.paymentDate.year().asc(),
				payment.paymentDate.month().asc(),
				payment.paymentDate.dayOfMonth().asc()
			)
			.fetch();
	}

	@Override
	public List<StorePaymentSumResponse> findMonthlySumByStore(UUID companyId, UUID departmentId,
		LocalDateTime startDate, LocalDateTime endDate) {
		return paymentQueryFactory
			.select(Projections.constructor(StorePaymentSumResponse.class,
				payment.storeId,
				payment.storeName,
				payment.amount.sum()
			))
			.from(payment)
			.where(
				payment.paymentDate.between(startDate, endDate),
				matchCompany(companyId),
				matchDepartment(departmentId)
			)
			.groupBy(payment.storeId)
			.fetch();
	}

	private JPAQuery<Long> createCountQuery(UUID companyId, UUID departmentId) {
		return companyQueryFactory
			.select(employee.count())
			.from(employee)
			.join(employee.department, department)
			.where(
				matchDepartment(departmentId),
				matchCompany(companyId)
			);
	}

	private List<EmployeeTotalPaymentResponse> createEmployeePaymentResponses(List<Employee> employees,
		List<EmployeeSpentAmount> spentAmounts) {
		return employees.stream()
			.map(employee -> {
				Long totalSpent = spentAmounts.stream()
					.filter(spentAmount -> spentAmount.getEmployeeId().equals(employee.getId()))
					.map(EmployeeSpentAmount::getSpentAmount)
					.findFirst()
					.orElse(0L);

				return EmployeeTotalPaymentResponse.builder()
					.employeeId(employee.getId())
					.employeeCode(employee.getCode())
					.employeeName(employee.getName())
					.departmentId(employee.getDepartment().getId())
					.departmentName(employee.getDepartment().getName())
					.supportAmount(employee.getSupportAmount())
					.spentAmount(totalSpent)
					.createdAt(employee.getCreatedAt())
					.build();
			})
			.collect(Collectors.toList());
	}

	private List<EmployeeSpentAmount> sumEmployeeSpentAmount(LocalDateTime startDate, LocalDateTime endDate,
		List<UUID> employeeIds) {
		return paymentQueryFactory
			.select(Projections.constructor(
				EmployeeSpentAmount.class,
				payment.employeeId,
				payment.amount.sum()
			))
			.from(payment)
			.where(
				payment.employeeId.in(employeeIds),  // 추출된 employeeId로 payment 조회
				payment.paymentDate.goe(startDate),  // >= 조건
				payment.paymentDate.loe(endDate)
			)
			.groupBy(payment.employeeId)
			.fetch();
	}

	private List<UUID> getEmployeeIds(List<Employee> employees) {
		return employees.stream()
			.map(Employee::getId)
			.collect(Collectors.toList());
	}

	private List<Employee> findEmployees(UUID companyId, UUID departmentId, Pageable pageable) {
		return companyQueryFactory
			.selectFrom(employee)
			.join(employee.department, department)
			.where(
				matchDepartment(departmentId),
				matchCompany(companyId)
			)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	private BooleanExpression matchCompany(UUID companyId) {
		if (companyId != null) {
			return employee.department.company.id.eq(companyId);
		}
		return null;
	}

	private BooleanExpression matchDepartment(UUID departmentId) {
		if (departmentId != null) {
			return department.id.eq(departmentId);
		}
		return null;
	}
}
