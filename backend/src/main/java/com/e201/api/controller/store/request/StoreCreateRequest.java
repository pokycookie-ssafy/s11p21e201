package com.e201.api.controller.store.request;

import java.util.UUID;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@NotNull
public class StoreCreateRequest {
	private UUID storeInfoId;
	private String email;
	private String password;

	@Builder
	private StoreCreateRequest(UUID storeInfoId, String email, String password) {
		this.storeInfoId = storeInfoId;
		this.email = email;
		this.password= password;
	}

	public Store toEntity(StoreInfo storeInfo){
		return Store.builder()
			.storeInfo(storeInfo)
			.email(email)
			.password(password)
			.build();
	}
}
