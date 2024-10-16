package com.e201.api.controller.company.request.manager;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ManagerAuthRequest {

	@NotBlank
	private String code;

	@NotBlank
	@Size(min = 8)
	private String password;

	@Builder
	private ManagerAuthRequest(String code, String password) {
		this.code = code;
		this.password = password;
	}
}
