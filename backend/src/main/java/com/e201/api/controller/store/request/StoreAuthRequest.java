package com.e201.api.controller.store.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreAuthRequest {
	String email;
	String password;

	@Builder
	public StoreAuthRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
