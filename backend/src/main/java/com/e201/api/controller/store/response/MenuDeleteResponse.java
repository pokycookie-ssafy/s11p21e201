package com.e201.api.controller.store.response;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class MenuDeleteResponse {
	UUID id;

	public MenuDeleteResponse(UUID id) {
		this.id =id;
	}
}
