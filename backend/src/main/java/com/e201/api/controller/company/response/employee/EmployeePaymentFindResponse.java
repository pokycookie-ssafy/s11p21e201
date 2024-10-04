package com.e201.api.controller.company.response.employee;

import java.time.LocalDateTime;
import java.util.UUID;

import com.e201.domain.entity.company.Employee;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeePaymentFindResponse {

	private UUID id;
	private String name;
	private UUID departmentId;
	private String departmentName;
	private Long supportAmount;
	private Long spentAmount;
	private LocalDateTime createdAt;

	@Builder
	public EmployeePaymentFindResponse(UUID id, String name, UUID departmentId, String departmentName,
		Long supportAmount, Long spentAmount, LocalDateTime createdAt) {
		this.id = id;
		this.name = name;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.supportAmount = supportAmount;
		this.spentAmount = spentAmount;
		this.createdAt = createdAt;
	}

	public static EmployeePaymentFindResponse of(Employee employee, Long spentAmount) {
		return EmployeePaymentFindResponse.builder()
			.id(employee.getId())
			.name(employee.getName())
			.departmentId(employee.getDepartment().getId())
			.departmentName(employee.getDepartment().getName())
			.supportAmount(employee.getSupportAmount())
			.spentAmount(spentAmount)
			.build();
	}
}
