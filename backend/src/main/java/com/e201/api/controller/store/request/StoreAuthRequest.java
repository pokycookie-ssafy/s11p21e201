package com.e201.api.controller.store.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class StoreAuthRequest {
	private String email;
	private String password;

	@Builder
	private StoreAuthRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
