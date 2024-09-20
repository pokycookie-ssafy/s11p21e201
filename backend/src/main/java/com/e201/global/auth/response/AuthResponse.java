package com.e201.global.auth.response;

import java.util.UUID;

import com.e201.global.auth.RoleType;

import lombok.Getter;

@Getter
public class AuthResponse {

	private UUID id;
	private RoleType roleType;

	public AuthResponse(UUID id, RoleType roleType) {
		this.id = id;
		this.roleType = roleType;
	}
}
