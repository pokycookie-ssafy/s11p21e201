package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreAuthRequest;
import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreFindResponse;
import com.e201.domain.annotation.JtaTransactional;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
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
	private final StoreInfoRepository storeInfoRepository;
	private final OneWayCipherService oneWayCipherService;
	private final StoreInfoService storeInfoService;

	@JtaTransactional
	public StoreCreateResponse create(StoreCreateRequest storeCreateRequest){
		StoreInfo storeInfo= storeInfoRepository.getById(storeCreateRequest.getStoreInfoId());
		Store store = storeCreateRequest.toEntity(storeInfo);
		encryptPassword(store);
		Store savedStore = storeRepository.save(store);

		return new StoreCreateResponse(savedStore.getId());
	}

	public AuthInfo checkPassword(StoreAuthRequest request) {
		Store store = storeRepository.findByEmail(request.getEmail())
			.orElseThrow(() -> new RuntimeException("not found company"));
		validatePassword(request, store);
		return new AuthInfo(store.getId(), RoleType.STORE);
	}

	public Store findEntity(UUID id) {
		return storeRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public StoreFindResponse findStore(UUID id){
		Store store = storeRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
		StoreInfo storeInfo = store.getStoreInfo();
		return createStoreFindResponse(store, storeInfo);
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
	private StoreFindResponse createStoreFindResponse(Store store, StoreInfo storeInfo) {
		return StoreFindResponse.builder()
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
