package com.e201.api.controller.store.request;

import com.e201.domain.entity.store.StoreInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreInfoCreateRequest {
	private String registerNumber;
	private String name;
	private String phone;
	private String businessType;
	private String businessAddress;
	private String representativeName;

	public StoreInfo toEntity(){
		return StoreInfo.builder()
			.registerNumber(registerNumber)
			.name(name)
			.phone(phone)
			.businessType(businessType)
			.businessAddress(businessAddress)
			.representativeName(representativeName)
			.build();
	}

	@Builder
	public StoreInfoCreateRequest(String registerNumber, String name, String phone, String businessType,
		String businessAddress, String representativeName){
		this.registerNumber=registerNumber;
		this.name=name;
		this.phone=phone;
		this.businessAddress=businessAddress;
		this.businessType=businessType;
		this.representativeName= representativeName;
	}

}
