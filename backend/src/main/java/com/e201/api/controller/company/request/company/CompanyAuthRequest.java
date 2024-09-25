package com.e201.api.controller.company.request.company;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CompanyAuthRequest {

	@Email
	private String email;

	@NotBlank
	@Size(min = 8)
	private String password;

	@Builder
	private CompanyAuthRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
