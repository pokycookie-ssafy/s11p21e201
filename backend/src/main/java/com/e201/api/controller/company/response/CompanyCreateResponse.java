package com.e201.api.controller.company.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class CompanyCreateResponse {

	private UUID id;

	public CompanyCreateResponse(UUID id) {
		this.id = id;
	}
}
