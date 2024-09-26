package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.api.controller.store.request.StoreAccountCreateRequest;
import com.e201.api.controller.store.response.StoreAccountCreateResponse;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreAccount;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreAccountRepository;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;
import com.e201.global.security.auth.constant.RoleType;

@SpringBootTest
@Transactional
class StoreAccountServiceTest {

	@Autowired
	StoreAccountRepository storeAccountRepository;

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreAccountService sut;

	StoreInfo storeInfo;
	Store store;

	@BeforeEach
	public void setUp() {
		storeInfo = createStoreInfo("사업자 등록 번호");
		store = createStore(storeInfo, "testStoreAccount@test.com", "12341234");
		storeInfoRepository.save(storeInfo);
		storeRepository.save(store);

	}

	@Transactional
	@DisplayName("식당 계좌(엔티티)를 조회한다.")
	@Test
	public void find_storeAccount_entity_success() {
		//given
		StoreAccount storeAccount = createStoreAccount(store);
		storeAccountRepository.save(storeAccount);

		//when
		StoreAccount findStoreAccount = sut.findEntity(storeAccount.getId());

		//then
		assertThat(findStoreAccount.getStore().getId()).isEqualTo(store.getId());
		assertThat(findStoreAccount.getBankCode()).isEqualTo(storeAccount.getBankCode());
		assertThat(findStoreAccount.getBankName()).isEqualTo(storeAccount.getBankName());

	}

	@DisplayName("존재하지 않는 식당 계좌를 조회하면 예외를 발생한다.")
	@Test
	public void find_storeAccount_entity_fail() {
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

	@DisplayName("식당 계좌를 생성한다.")
	@Test
	public void create_storeAccount_entity_success() {
		//given
		StoreAccountCreateRequest storeAccountCreateRequest = createStoreAccountRequest(store.getId());
		StoreAccount storeAccount = storeAccountCreateRequest.toEntity(store);

		//when
		StoreAccountCreateResponse response = sut.create(store.getId(), RoleType.STORE ,storeAccountCreateRequest);

		//then
		assertThat(response.getId()).isNotNull();
	}

	@DisplayName("권한이 올바르지 않는 경우 예외를 발생시킨다.")
	@Test
	public void create_storeAccount_entity_fail() {
		//given
		StoreAccountCreateRequest storeAccountCreateRequest = createStoreAccountRequest(store.getId());
		StoreAccount storeAccount = storeAccountCreateRequest.toEntity(store);

		//when, then
		assertThatThrownBy(()->sut.create(store.getId(), RoleType.COMPANY ,storeAccountCreateRequest)).isInstanceOf(RuntimeException.class);
	}
	private	StoreAccount createStoreAccount(Store store) {
		return StoreAccount.builder()
			.store(store)
			.bankCode("은행코드")
			.bankName("은행이름").build();
	}

	private StoreInfo createStoreInfo(String registerNumber) {
		return StoreInfo.builder()
			.registerNumber(registerNumber)
			.name("식당이름")
			.phone("식당 연락처")
			.businessType("업종")
			.businessAddress("식당 주소")
			.representativeName("대표자이름")
			.build();
	}

	private Store createStore(StoreInfo storeInfo, String email, String password) {
		return Store.builder()
			.storeInfo(storeInfo)
			.email(email)
			.password(password)
			.build();
	}


	private StoreAccountCreateRequest createStoreAccountRequest(UUID storeId){
		return StoreAccountCreateRequest.builder()
			.bankName("은행이름")
			.bankCode("은행코드")
			.accountNumber("계좌번호")
			.build();
	}
}