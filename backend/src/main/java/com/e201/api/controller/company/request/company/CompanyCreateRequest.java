package com.e201.api.controller.company.request.company;

import java.util.UUID;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CompanyCreateRequest {

	private UUID companyInfoId;
	private String email;
	private String password;

	@Builder
	public CompanyCreateRequest(UUID companyInfoId, String email, String password) {
		this.companyInfoId = companyInfoId;
		this.email = email;
		this.password = password;
	}

	public Company toEntity(CompanyInfo companyInfo) {
		return Company.builder()
			.companyInfo(companyInfo)
			.email(email)
			.password(password)
			.build();
	}
}
