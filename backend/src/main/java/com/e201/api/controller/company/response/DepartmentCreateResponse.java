package com.e201.api.controller.company.response;

import java.util.UUID;

import lombok.Getter;

@Getter
public class DepartmentCreateResponse {

	private UUID id;

	public DepartmentCreateResponse(UUID id) {
		this.id = id;
	}
}
