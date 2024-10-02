package com.e201.api.service.store;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreAndStoreInfoCreateRequest;
import com.e201.api.controller.store.request.StoreAuthRequest;
import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreAuthResponse;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreDeleteResponse;
import com.e201.domain.annotation.JtaTransactional;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;
import com.e201.global.exception.EntityNotFoundException;
import com.e201.global.exception.PasswordIncorrectException;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class StoreService {

	private final StoreRepository storeRepository;
	private final OneWayCipherService oneWayCipherService;
	private final StoreInfoRepository storeInfoRepository;

	@JtaTransactional
	public StoreCreateResponse create(StoreAndStoreInfoCreateRequest storeAndStoreInfoCreateRequest){

		StoreInfoCreateRequest storeInfoRequest = storeAndStoreInfoCreateRequest.createStoreInfoRequest();
		StoreCreateRequest storeCreateRequest  = storeAndStoreInfoCreateRequest.createStoreRequest();
		doubleCheckPassword(storeCreateRequest);
		StoreInfo storeInfo = storeInfoRequest.toEntity();
		StoreInfo savedStoreInfo = storeInfoRepository.save(storeInfo);
		Store store = storeCreateRequest.toEntity(savedStoreInfo);
		encryptPassword(store);
		Store savedStore = storeRepository.save(store);
		//TODO(KJK) : useremail로 account 생성, 저장
		return new StoreCreateResponse(savedStore.getId());
	}

	@JtaTransactional
	public StoreDeleteResponse delete(UUID id, RoleType roleType){
		validationStore(roleType);
		Store store = findEntity(id);
		store.softDelete();
		StoreInfo storeInfo = store.getStoreInfo();
		storeInfo.softDelete();
		return new StoreDeleteResponse(store.getId());
	}

	public AuthInfo checkPassword(StoreAuthRequest request) {
		Store store = storeRepository.findByEmail(request.getEmail())
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, STORE.name()));
		validatePassword(request, store);
		return new AuthInfo(store.getId(), RoleType.STORE);
	}

	public void doubleCheckPassword(StoreCreateRequest storeCreateRequest) {
		if(!storeCreateRequest.getPassword().equals(storeCreateRequest.getPasswordConfirm())){
			throw new RuntimeException("password not match");
		}
	}

	public Store findByEmail(String email){
		return storeRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public Store findStoreIdByRegisterNo(String registerNo){
		List<Store> stores = storeRepository.findByRegisterNoWithStoreInfo(registerNo);
		Store store = stores.getFirst();
		return store;

	}

	public StoreAuthResponse login(StoreAuthRequest storeAuthRequest){
		Store store = findByEmail(storeAuthRequest.getEmail());
		return StoreAuthResponse.builder()
			.id(store.getId())
			.email(store.getEmail())
			.name(store.getStoreInfo().getName())
			.phone(store.getStoreInfo().getPhone())
			.build();


	}

	public Store findEntity(UUID id) {
		return storeRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public StoreAuthResponse checkLogin(UUID id,RoleType roleType) {
		validationStore(roleType);
		Store store = findEntity(id);
		StoreInfo storeInfo= store.getStoreInfo();
		return StoreAuthResponse.builder()
			.id(store.getId())
			.name(storeInfo.getName())
			.email(store.getEmail())
			.phone(storeInfo.getPhone()).build();
	}

	private void encryptPassword(Store store) {
		String encryptedPassword = oneWayCipherService.encrypt(store.getPassword());
		store.changePassword(encryptedPassword);
	}


	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}

	private void validatePassword(StoreAuthRequest request, Store store) {
		if (!oneWayCipherService.match(request.getPassword(), store.getPassword())) {
			throw new PasswordIncorrectException(AUTHENTICATION_FAILED, STORE.name());
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
