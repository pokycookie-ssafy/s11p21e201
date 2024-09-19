package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreAccount;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreAccountRepository;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
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
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	StoreAccount createStoreAccount(Store store) {
		return StoreAccount.builder()
			.store(store)
			.bankCode("은행코드")
			.bankName("은행이름").build();
	}

	StoreInfo createStoreInfo(String registerNumber) {
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
}