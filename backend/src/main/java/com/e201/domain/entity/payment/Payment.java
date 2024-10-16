package com.e201.domain.entity.payment;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.store.Sales;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "payment_id", columnDefinition = "BINARY(16)")
	private UUID id;

	@Column(name = "contract_id")
	private UUID contractId;

	@Column(name = "store_id")
	private UUID storeId;

	@Column(name = "store_name")
	private String storeName;

	@Column(name = "company_id")
	private UUID companyId;

	@Column(name = "department_id")
	private UUID departmentId;

	@Column(name = "department_name")
	private String departmentName;

	@Column(name = "employee_id")
	private UUID employeeId;

	@Column(name = "employee_name")
	private String employeeName;

	@Column(name = "amount")
	private Long amount;

	@Column(name = "payment_date")
	private LocalDateTime paymentDate = LocalDateTime.now();

	@Builder
	public Payment(UUID id, UUID contractId, UUID storeId, String storeName, UUID employeeId, String employeeName, UUID companyId,
		UUID departmentId, String departmentName, Long amount, LocalDateTime paymentDate) {
		this.id = id;
		this.contractId = contractId;
		this.storeId = storeId;
		this.storeName = storeName;
		this.companyId = companyId;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.amount = amount;
		this.paymentDate = paymentDate;
	}
}
