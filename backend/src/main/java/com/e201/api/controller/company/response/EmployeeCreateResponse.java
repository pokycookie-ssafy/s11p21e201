package com.e201.api.controller.company.response;

import java.util.UUID;

import lombok.Getter;

@Getter
public class EmployeeCreateResponse {

	private UUID id;

	public EmployeeCreateResponse(UUID id) {
		this.id = id;
	}
}
