package com.e201.api.controller.store.request;

import com.e201.domain.entity.store.StoreInfo;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class StoreInfoCreateRequest {
	private String registerNumber;
	private String name;
	private String phone;
	private String businessType;
	private String businessAddress;
	private String representativeName;
	private String openDate;


	@Builder
	private StoreInfoCreateRequest(String registerNumber, String name, String phone, String businessType,
		String businessAddress, String representativeName, String openDate){
		this.registerNumber=registerNumber;
		this.name=name;
		this.phone=phone;
		this.businessAddress=businessAddress;
		this.businessType=businessType;
		this.representativeName= representativeName;
		this.openDate =openDate;

	}

	public StoreInfo toEntity(){
		return StoreInfo.builder()
			.registerNumber(registerNumber)
			.name(name)
			.phone(phone)
			.businessType(businessType)
			.businessAddress(businessAddress)
			.representativeName(representativeName)
			.openDate(openDate)
			.build();
	}
}
