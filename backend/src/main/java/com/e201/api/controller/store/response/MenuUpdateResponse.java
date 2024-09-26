package com.e201.api.controller.store.response;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuUpdateResponse {
	private UUID id;

	public MenuUpdateResponse(UUID id){
		this.id = id;
	}

}
