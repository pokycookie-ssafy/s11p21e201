package com.e201.global.exception;

import java.util.UUID;

public class EntityNotFoundException extends BusinessException {

	public EntityNotFoundException(ErrorCode errorCode, String entityName) {
		super(errorCode, entityName + " not found");
	}
}
