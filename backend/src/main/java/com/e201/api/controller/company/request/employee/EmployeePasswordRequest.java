package com.e201.api.controller.company.request.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
public class EmployeePasswordRequest {

	@NotBlank
	@Size(min = 8)
	private String beforePassword;

	@NotBlank
	@Size(min = 8)
	private String afterPassword;

	@Builder
	private EmployeePasswordRequest(String beforePassword, String afterPassword) {
		this.beforePassword = beforePassword;
		this.afterPassword = afterPassword;
	}
}
