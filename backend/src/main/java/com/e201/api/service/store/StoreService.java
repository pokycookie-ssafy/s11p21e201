package com.e201.api.service.store;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.management.relation.Role;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.StoreAccountCreateRequest;
import com.e201.api.controller.store.request.StoreAndStoreInfoCreateRequest;
import com.e201.api.controller.store.request.StoreAuthRequest;
import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreAccountCreateResponse;
import com.e201.api.controller.store.response.StoreAuthResponse;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreDeleteResponse;
import com.e201.client.service.financial.FinancialService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreAccount;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreAccountRepository;
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
	private final StoreAccountRepository storeAccountRepository;
	private final OneWayCipherService oneWayCipherService;
	private final StoreInfoRepository storeInfoRepository;
<<<<<<< HEAD
<<<<<<< HEAD
=======
	private final StoreAccountService storeAccountService;
>>>>>>> f79a5ca ([#41] feat: Store 계정 생성 시, 계좌 생성 기능 구현)
=======
>>>>>>> 4e5f83f ([#41] fix: StoreService, storeAccountService 순환참조 해결)
	private final FinancialService financialService;

	@JtaTransactional
	public StoreCreateResponse create(StoreAndStoreInfoCreateRequest storeAndStoreInfoCreateRequest) {

		StoreInfoCreateRequest storeInfoRequest = storeAndStoreInfoCreateRequest.createStoreInfoRequest();
		StoreCreateRequest storeCreateRequest = storeAndStoreInfoCreateRequest.createStoreRequest();
		doubleCheckPassword(storeCreateRequest);
		StoreInfo storeInfo = storeInfoRequest.toEntity();
		StoreInfo savedStoreInfo = storeInfoRepository.save(storeInfo);
		Store store = storeCreateRequest.toEntity(savedStoreInfo);
		encryptPassword(store);
		Store savedStore = storeRepository.save(store);

		// 계좌번호 생성
		String accountNo = financialService.createAccount();
		StoreAccountCreateRequest accountCreateRequest = StoreAccountCreateRequest
			.builder()
			.bankCode("999")
			.bankName("싸피은행")
			.accountNumber(accountNo)
			.build();

<<<<<<< HEAD
<<<<<<< HEAD
		StoreAccount storeAccount = accountCreateRequest.toEntity(store);
		StoreAccount savedStoreAccount = storeAccountRepository.save(storeAccount);
=======
		StoreAccountCreateResponse res = storeAccountService.create(store.getId(), RoleType.STORE, accountCreateRequest);
>>>>>>> f79a5ca ([#41] feat: Store 계정 생성 시, 계좌 생성 기능 구현)
=======
		StoreAccount storeAccount = accountCreateRequest.toEntity(store);
		StoreAccount savedStoreAccount = storeAccountRepository.save(storeAccount);
>>>>>>> 4e5f83f ([#41] fix: StoreService, storeAccountService 순환참조 해결)

		//TODO(KJK) : useremail로 account 생성, 저장
		return new StoreCreateResponse(savedStore.getId());
	}

	@JtaTransactional
	public StoreDeleteResponse delete(UUID id, RoleType roleType) {
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
		if (!storeCreateRequest.getPassword().equals(storeCreateRequest.getPasswordConfirm())) {
			throw new RuntimeException("password not match");
		}
	}

	public Store findByEmail(String email) {
		return storeRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public Store findStoreIdByRegisterNo(String registerNo) {
		List<Store> stores = storeRepository.findByRegisterNoWithStoreInfo(registerNo);
		Store store = stores.getFirst();
		return store;
	}

	public StoreAuthResponse login(StoreAuthRequest storeAuthRequest) {
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

	public StoreAuthResponse checkLogin(UUID id, RoleType roleType) {
		validationStore(roleType);
		Store store = findEntity(id);
		StoreInfo storeInfo = store.getStoreInfo();
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

	public UUID findStoreInfoId(UUID id, RoleType roleType) {
		validationStore(roleType);
		Store store = findEntity(id);
		return store.getStoreInfo().getId();

	}

	public UUID getStoreInfoId(UUID id) {
		Store store = findEntity(id);
		return store.getStoreInfo().getId();
	}

	public void checkDuplication(String email) {
		Optional<Store> checkedEmail = storeRepository.findByEmail(email);
		if (checkedEmail.isPresent()) {
			throw new RuntimeException("duplicated email");
		}
	}
}
