package com.e201.domain.entity.contract;

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
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Invoice extends BaseEntity {

	@Id
	@GeneratedValue(strategy= GenerationType.UUID)
	@Column(name= "invoice_id", columnDefinition = "BINARY(16)")
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="contract_id")
	private Contract contract;

	@Column(name="image_url")
	private String imageUrl;

	@Builder
	public Invoice(UUID id, Contract contract, String imageUrl) {
		this.id = id;
		this.contract = contract;
		this.imageUrl = imageUrl;
	}
}
