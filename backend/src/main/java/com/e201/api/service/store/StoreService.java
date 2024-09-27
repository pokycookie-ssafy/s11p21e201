package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreAuthRequest;
import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreDeleteResponse;
import com.e201.domain.annotation.JtaTransactional;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreRepository;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class StoreService {

	private final StoreRepository storeRepository;
	private final StoreInfoService storeInfoService;
	private final OneWayCipherService oneWayCipherService;

	@JtaTransactional
	public StoreCreateResponse create(StoreCreateRequest storeCreateRequest){
		StoreInfo storeInfo = storeInfoService.findEntity(storeCreateRequest.getStoreInfoId());
		Store store = storeCreateRequest.toEntity(storeInfo);
		encryptPassword(store);
		Store savedStore = storeRepository.save(store);

		return new StoreCreateResponse(savedStore.getId());
	}

	@JtaTransactional
	public StoreDeleteResponse delete(UUID id, RoleType roleType){
		validationStore(roleType);
		Store store = findEntity(id);
		store.softDelete();

		return new StoreDeleteResponse(store.getId());
	}

	public AuthInfo checkPassword(StoreAuthRequest request) {
		Store store = storeRepository.findByEmail(request.getEmail())
			.orElseThrow(() -> new RuntimeException("not found store"));
		validatePassword(request, store);
		return new AuthInfo(store.getId(), RoleType.STORE);
	}

	public Store findEntity(UUID id) {
		return storeRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}


	private void encryptPassword(Store store) {
		String encryptedPassword = oneWayCipherService.encrypt(store.getPassword());
		store.changePassword(encryptedPassword);
	}

	private void validatePassword(StoreAuthRequest request, Store store) {
		if (!oneWayCipherService.match(request.getPassword(), store.getPassword())) {
			throw new RuntimeException("wrong password");
		}
	}

	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}

	public UUID findStoreInfoId(UUID id, RoleType roleType){
		validationStore(roleType);
		Store store =findEntity(id);
		return store.getStoreInfo().getId();

	}

	public UUID getStoreInfoId(UUID id) {
		Store store = findEntity(id);
		return store.getStoreInfo().getId();
	}
}
