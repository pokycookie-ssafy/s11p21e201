package com.e201.api.controller.company.request.company;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CompanyAuthRequest {

	private String email;
	private String password;

	@Builder
	private CompanyAuthRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
