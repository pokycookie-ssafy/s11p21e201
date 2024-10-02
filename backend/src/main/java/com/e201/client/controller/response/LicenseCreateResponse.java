package com.e201.client.controller.response;

import java.util.Date;

import lombok.Getter;

@Getter
public class LicenseCreateResponse {
	private String repName;
	private String businessName;
	private String address;
	private String registerNumber;
	private String openDate;
	private String businessType;

	public LicenseCreateResponse(String repName,String businessName, String registerNumber, String address, String openDate, String businessType) {
		this.repName = repName;
		this.businessName = businessName;
		this.registerNumber = registerNumber;
		this.address = address;
		this.openDate = openDate;
		this.businessType = businessType;
	}
}
