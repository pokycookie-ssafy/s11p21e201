package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreInfoService {

	private final StoreInfoRepository storeInfoRepository;

	public StoreInfo findEntity(UUID id) {
		return storeInfoRepository.findById(id).orElseThrow(() -> new RuntimeException("not found Exception"));
	}
}
