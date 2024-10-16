package com.e201.api.controller.company.request.companyinfo;

import com.e201.domain.entity.company.CompanyInfo;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CompanyInfoCreateRequest {

	@NotBlank
	private String registerNumber;

	@NotBlank
	private String businessName;

	@NotBlank
	private String representativeName;

	@NotBlank
	private String phone;

	@NotBlank
	private String businessType;

	@NotBlank
	private String address;

	@Builder
	private CompanyInfoCreateRequest(String registerNumber, String businessName, String representativeName, String phone,
		String businessType, String address) {
		this.registerNumber = registerNumber;
		this.businessName = businessName;
		this.representativeName = representativeName;
		this.phone = phone;
		this.businessType = businessType;
		this.address = address;
	}

	public CompanyInfo toEntity() {
		return CompanyInfo.builder()
			.registerNumber(registerNumber)
			.name(businessName)
			.representativeName(representativeName)
			.phone(phone)
			.businessType(businessType)
			.businessAddress(address)
			.build();
	}
}
