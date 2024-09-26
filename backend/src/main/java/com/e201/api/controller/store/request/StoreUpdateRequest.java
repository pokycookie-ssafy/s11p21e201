package com.e201.api.controller.store.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
@NotBlank
public class StoreUpdateRequest {
	private String name;
	private String licenseNo;
	private String address;
	private String category;
	private String ownerName;
	private String phone;

	@Builder
	public StoreUpdateRequest(String name, String licenseNo, String address, String category, String ownerName, String phone) {
		this.name = name;
		this.licenseNo = licenseNo;
		this.address = address;
		this.category = category;
		this.ownerName = ownerName;
		this.phone = phone;
	}
}
