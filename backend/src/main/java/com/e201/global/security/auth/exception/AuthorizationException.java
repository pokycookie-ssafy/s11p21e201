package com.e201.global.security.auth.exception;

import com.e201.global.exception.BusinessException;
import com.e201.global.exception.ErrorCode;

public class AuthorizationException extends BusinessException {

	public AuthorizationException(ErrorCode errorCode, String message) {
		super(errorCode, message);
 	}
}
