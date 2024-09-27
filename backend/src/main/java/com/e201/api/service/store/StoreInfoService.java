package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.request.StoreInfoUpdateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.api.controller.store.response.StoreInfoFindResponse;
import com.e201.api.controller.store.response.StoreInfoUpdateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.global.security.auth.constant.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class StoreInfoService {
	private final StoreInfoRepository storeInfoRepository;

	@JtaTransactional
	public StoreInfoCreateResponse create(StoreInfoCreateRequest storeInfoCreateRequest) {
		StoreInfo entity = storeInfoCreateRequest.toEntity();
		StoreInfo storeInfo = storeInfoRepository.save(entity);
		return new StoreInfoCreateResponse(storeInfo.getId());
	}

	public StoreInfo findEntity(UUID id) {
		return storeInfoRepository.findById(id).orElseThrow(() -> new RuntimeException("not found Exception"));
	}

	public StoreInfoFindResponse findOne(UUID storeId){
		StoreInfo storeInfo = findEntity(storeId);
		return createStoreFindResponse(storeId, storeInfo);
	}

	@JtaTransactional
	public StoreInfoUpdateResponse update(UUID storeInfoId,RoleType roleType, StoreInfoUpdateRequest storeInfoUpdateRequest) {
		validationStore(roleType);
		StoreInfo updateEntity = findEntity(storeInfoId);
		updateEntity.update(storeInfoUpdateRequest.getLicenseNo(),storeInfoUpdateRequest.getName(),
			storeInfoUpdateRequest.getPhone(), storeInfoUpdateRequest.getCategory(),
			storeInfoUpdateRequest.getAddress(), storeInfoUpdateRequest.getOwnerName());
		return new StoreInfoUpdateResponse(updateEntity.getId());
	}


	@JtaTransactional
	public void remove(UUID id) {
		storeInfoRepository.deleteById(id);
	}

	private StoreInfoFindResponse createStoreFindResponse(UUID storeId, StoreInfo storeInfo) {
		return StoreInfoFindResponse.builder()
			.id(storeId)
			.name(storeInfo.getName())
			.licenseNo(storeInfo.getRegisterNumber())
			.address(storeInfo.getBusinessAddress())
			.category(storeInfo.getBusinessType())
			.ownerName(storeInfo.getRepresentativeName())
			.phone(storeInfo.getPhone())
			.build();
	}

	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}


}
