package com.e201.api.controller.company.response.company;

import java.util.UUID;

import lombok.Getter;

@Getter
public class CompanyAuthResponse {

	private UUID companyId;

	public CompanyAuthResponse(UUID companyId) {
		this.companyId = companyId;
	}
}
