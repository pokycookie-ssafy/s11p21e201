package com.e201.global.security.auth.dto;

import java.util.UUID;

import com.e201.global.security.auth.constant.RoleType;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AuthInfo {

	private UUID id;
	private RoleType roleType;

	public AuthInfo(UUID id, RoleType roleType) {
		this.id = id;
		this.roleType = roleType;
	}
}
