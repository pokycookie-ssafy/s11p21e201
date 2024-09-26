package com.e201.api.controller.store.response;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class StoreFindResponse {
	private UUID id;
	private String name;
	private String licenseNo;
	private String address;
	private String category;
	private String ownerName;
	private String phone;

	@Builder
	private StoreFindResponse(UUID id, String name, String licenseNo,String address
	, String category, String ownerName, String phone){
		this.id= id;
		this.name=name;
		this.licenseNo = licenseNo;
		this.address=address;
		this.category=category;
		this.ownerName=ownerName;
		this.phone=phone;
	}
}

