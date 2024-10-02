package com.e201.api.controller.store.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreAndStoreInfoCreateRequest {
	private String email;
	private String password;
	private String passwordConfirm;
	private String phone;
	private String businessName;
	private String repName;
	private String address;
	private String registerNumber;
	private String businessType;
	private String openDate;

	@Builder
	private StoreAndStoreInfoCreateRequest(String email, String password,
		String passwordConfirm, String phone, String businessName,
		String repName, String address, String registerNumber, String businessType, String openDate) {
		this.email = email;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
		this.phone = phone;
		this.businessName = businessName;
		this.repName = repName;
		this.address=address;
		this.registerNumber=registerNumber;
		this.businessType=businessType;
		this.openDate= openDate;
	}
	public StoreCreateRequest createStoreRequest(){
		return StoreCreateRequest.builder().email(email)
			.password(password)
			.passwordConfirm(passwordConfirm)
			.build();
	}
	public StoreInfoCreateRequest createStoreInfoRequest(){
		return StoreInfoCreateRequest.builder()
			.registerNumber(registerNumber)
			.businessAddress(address)
			.name(businessName)
			.phone(phone)
			.businessType(businessType)
			.representativeName(repName)
			.openDate(openDate)
			.build();
	}
}
