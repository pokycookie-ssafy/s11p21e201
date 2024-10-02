package com.e201.api.controller.store.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreRegisterNoInfoResponse {
	UUID id;

	public StoreRegisterNoInfoResponse(UUID id) {
		this.id = id;
	}
}
