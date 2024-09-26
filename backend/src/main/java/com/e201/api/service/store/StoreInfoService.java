package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.api.controller.store.response.StoreInfoFindResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class StoreInfoService {

	private final StoreInfoRepository storeInfoRepository;
	private final StoreRepository storeRepository;
	@JtaTransactional
	public StoreInfoCreateResponse create(StoreInfoCreateRequest storeInfoCreateRequest) {
		StoreInfo entity = storeInfoCreateRequest.toEntity();
		StoreInfo storeInfo = storeInfoRepository.save(entity);
		return new StoreInfoCreateResponse(storeInfo.getId());
	}

	public StoreInfo findEntity(UUID id) {
		return storeInfoRepository.findById(id).orElseThrow(() -> new RuntimeException("not found Exception"));
	}


	public StoreInfoFindResponse findOne(UUID id){
		Store store = storeRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
		StoreInfo storeInfo = store.getStoreInfo();
		return createStoreFindResponse(store, storeInfo);
	}


	@JtaTransactional
	public void remove(UUID id) {
		storeInfoRepository.deleteById(id);
	}

	private StoreInfoFindResponse createStoreFindResponse(Store store, StoreInfo storeInfo) {
		return StoreInfoFindResponse.builder()
			.id(store.getId())
			.name(storeInfo.getName())
			.licenseNo(storeInfo.getRegisterNumber())
			.address(storeInfo.getBusinessAddress())
			.category(storeInfo.getBusinessType())
			.ownerName(storeInfo.getRepresentativeName())
			.phone(storeInfo.getPhone())
			.build();
	}
}
