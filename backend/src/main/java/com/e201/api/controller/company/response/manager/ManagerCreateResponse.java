package com.e201.api.controller.company.response.manager;

import java.util.UUID;

import lombok.Getter;

@Getter
public class ManagerCreateResponse {

	private UUID id;

	public ManagerCreateResponse(UUID id) {
		this.id = id;
	}
}
