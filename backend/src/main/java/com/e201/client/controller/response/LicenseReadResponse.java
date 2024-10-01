package com.e201.client.controller.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LicenseReadResponse {
	String ownerId;
	LicenseCreateResponse result;

	public LicenseReadResponse(String ownerId, LicenseCreateResponse result) {
		this.ownerId = ownerId;
		this.result = result;
	}

}
