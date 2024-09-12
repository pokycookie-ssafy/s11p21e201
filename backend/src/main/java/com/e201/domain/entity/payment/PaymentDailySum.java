package com.e201.domain.entity.payment;

import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentDailySum extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "payment_daily_id", columnDefinition = "BINARY(16)")
	private UUID id;

	@Column(name = "contract_id")
	private UUID contractId;

	@Column(name = "amount")
	private int amount;

	@Builder
	public PaymentDailySum(UUID id, UUID contractId, int amount) {
		this.id = id;
		this.contractId = contractId;
		this.amount = amount;
	}
}
