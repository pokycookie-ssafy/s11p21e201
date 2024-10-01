package com.e201.client.controller.response;

import lombok.Getter;

@Getter
public class LicenseCreateResponse {
	private String representationName;
	private String companyName;
	private String registerNumber;
	private String openDate;
	private String bisType;
	private String bisItem;
	private String bisAddress;

	public LicenseCreateResponse(String representationName,String companyName, String registerNumber, String openDate, String bisType, String bisItem, String bisAddress) {
		this.representationName = representationName;
		this.companyName = companyName;
		this.registerNumber = registerNumber;
		this.openDate = openDate;
		this.bisType = bisType;
		this.bisItem = bisItem;
		this.bisAddress = bisAddress;
	}
}
