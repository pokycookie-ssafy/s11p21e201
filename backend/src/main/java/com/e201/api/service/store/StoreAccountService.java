package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreAccountCreateRequest;
import com.e201.api.controller.store.response.StoreAccountCreateResponse;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreAccount;
import com.e201.domain.repository.store.StoreAccountRepository;
import com.e201.global.security.auth.constant.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreAccountService {

	private final StoreAccountRepository storeAccountRepository;
	private final StoreService storeService;

	public StoreAccountCreateResponse create(UUID id, RoleType roleType,StoreAccountCreateRequest storeAccountCreateRequest){
		validationStore(roleType);
		Store store = storeService.findEntity(id);
		StoreAccount storeAccount = storeAccountCreateRequest.toEntity(store);
		StoreAccount savedStoreAccount = storeAccountRepository.save(storeAccount);
		return new StoreAccountCreateResponse(savedStoreAccount.getId());
	}

	public StoreAccount findEntity(UUID id) {
		return storeAccountRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}

}
