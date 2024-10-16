package com.e201.domain.entity.company;

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
public class CompanyInfo extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "company_info_id", columnDefinition = "BINARY(16)")
	private UUID id;

	@Column(name = "register_number")
	private String registerNumber;

	@Column(name = "name")
	private String name;

	@Column(name = "rep_name")
	private String representativeName;

	@Column(name = "phone")
	private String phone;

	@Column(name = "bis_type")
	private String businessType;

	@Column(name = "bis_address")
	private String businessAddress;

	@Builder
	private CompanyInfo(UUID id, String registerNumber, String name, String representativeName, String phone,
		String businessType, String businessAddress) {
		this.id = id;
		this.registerNumber = registerNumber;
		this.name = name;
		this.representativeName = representativeName;
		this.phone = phone;
		this.businessType = businessType;
		this.businessAddress = businessAddress;
	}
}
