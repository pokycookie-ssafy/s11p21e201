package com.e201.domain.entity.store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StoreAccount extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name="account_id" , columnDefinition = "BINARY(16)")
	private UUID id;

	@ManyToOne
	@JoinColumn(name="store_id")
	private Store store;

	@Column(name = "bank_code")
	private String bankCode;

	@Column(name = "bank_name")
	private String bankName;

	@Builder
	public StoreAccount(UUID id, Store store, String bankCode, String bankName) {
		this.id = id;
		this.store = store;
		this.bankCode = bankCode;
		this.bankName = bankName;
	}
}
