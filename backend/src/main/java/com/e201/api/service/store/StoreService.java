package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.store.Store;
import com.e201.domain.repository.store.StoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreService {

	private final StoreRepository storeRepository;

	public Store findEntity(UUID id) {
		return storeRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
