package com.e201.api.controller.company.request.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeeAuthRequest {

	@NotBlank
	private String code;

	@NotBlank
	@Size(min = 8)
	private String password;

	@Builder
	private EmployeeAuthRequest(String code, String password) {
		this.code = code;
		this.password = password;
	}
}
