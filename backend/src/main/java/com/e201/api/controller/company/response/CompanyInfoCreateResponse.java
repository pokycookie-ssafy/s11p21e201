package com.e201.api.controller.company.response;

import java.util.UUID;

import lombok.Getter;

@Getter
public class CompanyInfoCreateResponse {

	private UUID id;

	public CompanyInfoCreateResponse(UUID id) {
		this.id = id;
	}
}
