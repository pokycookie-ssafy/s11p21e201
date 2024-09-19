package com.e201.domain.entity.contract;

import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Contract extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(columnDefinition = "BINARY(16)", name="contract_id")
	private UUID id;

	@Column(name="company_id")
	private UUID companyId;

	@Column(name="store_id")
	private UUID storeId;

	@Column(name="status")
	private String status;

	@Column(name="sattlement_date")
	private int sattlementDate;

	@Builder
	public Contract(UUID id, UUID companyId, UUID storeId, String status, int sattlementDate) {
		this.id = id;
		this.companyId = companyId;
		this.storeId = storeId;
		this.status = status;
		this.sattlementDate = sattlementDate;
	}
}
