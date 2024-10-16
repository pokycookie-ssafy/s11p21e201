package com.e201.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	DUPLICATED(409),
	NOT_FOUND(404),
	INVALID_PARAMS(400),
	AUTHENTICATION_FAILED(401),
	AUTHORIZATION_FAILED(403);

	private final int status;

	ErrorCode(int status) {
		this.status = status;
	}
}
