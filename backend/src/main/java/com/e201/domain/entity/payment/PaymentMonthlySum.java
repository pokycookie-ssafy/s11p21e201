package com.e201.domain.entity.payment;

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

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentMonthlySum extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "payment_monthly_id", columnDefinition = "BINARY(16)")
	private UUID id;

	@Column(name="contract_id")
	private UUID contractId;

	@Column(name="amount")
	private Long amount;

	@Column(name="paid")
	private Long paid;

	@Column(name="receivable")
	private Long receivable;

	@Builder
	public PaymentMonthlySum(UUID id, UUID contractId, Long amount, Long paid, Long receivable) {
		this.id = id;
		this.contractId = contractId;
		this.amount = amount;
		this.paid = paid;
		this.receivable = receivable;
	}
}
