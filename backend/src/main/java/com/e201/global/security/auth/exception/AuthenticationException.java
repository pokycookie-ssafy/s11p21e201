package com.e201.global.security.auth.exception;

import com.e201.global.exception.BusinessException;
import com.e201.global.exception.ErrorCode;

public class AuthenticationException extends BusinessException {

	public AuthenticationException(ErrorCode errorCode, String message) {
		super(errorCode, message);
	}
}
