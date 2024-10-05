package com.e201.api.controller.store.request;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QRValidationRequest {
	private String validationId ;

	public QRValidationRequest(String validationId) {
		this.validationId = validationId;
	}
}
