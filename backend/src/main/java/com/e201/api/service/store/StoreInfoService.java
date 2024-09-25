package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;

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

	@JtaTransactional
	public void remove(UUID id) {
		storeInfoRepository.deleteById(id);
	}
}
