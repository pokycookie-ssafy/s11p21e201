package com.e201.global.exception;

public class PasswordIncorrectException extends BusinessException {

	public PasswordIncorrectException(ErrorCode errorCode, String entityName) {
		super(errorCode, entityName + " password is incorrect");
	}
}
