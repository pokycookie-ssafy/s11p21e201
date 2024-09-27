package com.e201.api.controller.store.response;

import java.util.UUID;

import lombok.Getter;

@Getter
public class StoreDeleteResponse {
	UUID id;

	public StoreDeleteResponse(UUID id) {
		this.id = id;
	}
}
