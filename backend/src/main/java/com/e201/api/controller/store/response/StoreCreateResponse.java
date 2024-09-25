package com.e201.api.controller.store.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreCreateResponse {
	private UUID id;

	public StoreCreateResponse(UUID id){
		this.id= id;
	}

}
