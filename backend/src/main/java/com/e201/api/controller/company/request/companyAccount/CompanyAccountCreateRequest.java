package com.e201.api.controller.company.request.companyAccount;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyAccount;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CompanyAccountCreateRequest {
	private String bankCode;
	private String bankName;
	private String accountNumber;

	@Builder
	private CompanyAccountCreateRequest(String bankCode, String bankName, String accountNumber) {
		this.bankCode = bankCode;
		this.bankName = bankName;
		this.accountNumber = accountNumber;
	}

	public CompanyAccount toEntity(Company company){
		return CompanyAccount.builder()
			.company(company)
			.bankCode(bankCode)
			.bankName(bankName)
			.number(accountNumber)
			.build();
	}

}
