package com.e201.api.controller.company.request.employee;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeeAuthRequest {

	private String code;
	private String password;

	@Builder
	private EmployeeAuthRequest(String code, String password) {
		this.code = code;
		this.password = password;
	}
}
