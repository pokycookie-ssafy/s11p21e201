package com.e201.api.controller.store.response;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreAuthResponse {
	private UUID id;
	private String name;
	private String email;
	private String phone;

	@Builder
	private StoreAuthResponse(UUID id, String name, String email, String phone){
		this.id= id;
		this.name=name;
		this.email=email;
		this.phone=phone;
	}
}
