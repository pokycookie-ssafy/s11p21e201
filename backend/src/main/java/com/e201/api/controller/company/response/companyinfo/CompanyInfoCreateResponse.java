package com.e201.api.controller.company.response.companyinfo;

import java.util.UUID;

import lombok.Getter;

@Getter
public class CompanyInfoCreateResponse {

	private UUID id;

	public CompanyInfoCreateResponse(UUID id) {
		this.id = id;
	}
}
