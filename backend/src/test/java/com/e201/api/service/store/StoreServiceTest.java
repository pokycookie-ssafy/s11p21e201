package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
class StoreServiceTest {

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreService storeService;

	@Transactional
	@DisplayName("식당 계정(엔티티)를 조회한다.")
	@Test
	void find_store_entity_success() {
		//given
		StoreInfo storeInfo = createStoreInfo("사업자 등록 번호");
		storeInfoRepository.save(storeInfo);

		Store store = createStore(storeInfo, "storeTest@test.com", "12341234");
		storeRepository.save(store);
		//when
		Store findStore = storeService.findEntity(store.getId());

		//then
		assertThatStoreInfoMatchExactly(storeInfo);
		assertThatStoreMatchExactly(store);

	}

	@DisplayName("존재하지 않는 식당을 조회하면 예외가 발생한다.")
	@Test
	void find_store_entity_fail() {
		// expected
		assertThatThrownBy(() -> storeService.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
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

	private void assertThatStoreMatchExactly(Store store) {
		assertThat(store)
			.extracting("email", "password")
			.containsExactly("storeTest@test.com", "12341234");

	}

	private void assertThatStoreInfoMatchExactly(StoreInfo storeInfo) {
		assertThat(storeInfo)
			.extracting("name", "phone", "businessType", "businessAddress", "representativeName", "registerNumber")
			.containsExactly("식당이름", "식당 연락처", "업종", "식당 주소", "대표자이름", "사업자 등록 번호");
	}
}


