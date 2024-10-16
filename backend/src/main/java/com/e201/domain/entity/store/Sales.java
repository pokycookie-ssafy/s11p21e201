package com.e201.domain.entity.store;

import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sales extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name="sales_id" , columnDefinition = "BINARY(16)")
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="menu_id")
	private Menu menu;

	@Column(name = "company_id")
	private UUID companyId;

	@Column(name = "store_id")
	private UUID storeId;

	@Column(name= "payment_id" )
	private UUID paymentId;

	@Column(name="employee_id")
	private UUID employeeId;

	@Builder
	public Sales(UUID id, Menu menu , UUID companyId,
		UUID paymentId, UUID employeeId,
		UUID storeId){
		this.id = id;
		this.menu = menu;
		this.companyId =companyId;
		this.paymentId= paymentId;
		this.employeeId =employeeId;
		this.storeId = storeId;
	}
}
