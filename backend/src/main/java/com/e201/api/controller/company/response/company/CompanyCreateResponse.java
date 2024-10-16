package com.e201.api.controller.company.response.company;

import java.util.UUID;

import lombok.Getter;

@Getter
public class CompanyCreateResponse {

	private UUID id;

	public CompanyCreateResponse(UUID id) {
		this.id = id;
	}
}
