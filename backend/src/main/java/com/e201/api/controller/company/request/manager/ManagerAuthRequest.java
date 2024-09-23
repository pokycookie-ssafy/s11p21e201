package com.e201.api.controller.company.request.manager;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ManagerAuthRequest {

	private String code;
	private String password;

	@Builder
	private ManagerAuthRequest(String code, String password) {
		this.code = code;
		this.password = password;
	}
}
