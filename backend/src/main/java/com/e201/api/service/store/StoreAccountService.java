package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.store.StoreAccount;
import com.e201.domain.repository.store.StoreAccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreAccountService {

	private final StoreAccountRepository storeAccountRepository;

	public StoreAccount findEntity(UUID id) {
		return storeAccountRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
