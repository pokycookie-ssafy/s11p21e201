package com.e201.domain.entity.company;

import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "company_id", columnDefinition = "BINARY(16)")
	private UUID id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_info_id")
	private CompanyInfo companyInfo;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Builder
	private Company(UUID id, CompanyInfo companyInfo, String email, String password) {
		this.id = id;
		this.companyInfo = companyInfo;
		this.email = email;
		this.password = password;
	}

	public void changePassword(String password) {
		this.password = password;
	}
}
