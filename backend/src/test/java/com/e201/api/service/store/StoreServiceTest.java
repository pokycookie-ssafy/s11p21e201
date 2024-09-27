package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.api.controller.store.request.StoreAuthRequest;
import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreDeleteResponse;
import com.e201.api.controller.store.response.StoreInfoFindResponse;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

@SpringBootTest
@Transactional
class StoreServiceTest {

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreService sut;

	@Autowired
	StoreService storeService;

	@Autowired
	OneWayCipherService oneWayCipherService;

	StoreInfo storeInfo;

	@BeforeEach
	void setUp() {
		storeInfo = storeInfoRepository.save(createStoreInfo("사업자 등록 번호"));
	}

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
		Store findStore = sut.findEntity(store.getId());

		//then
		assertThatStoreInfoMatchExactly(storeInfo);
		assertThatStoreMatchExactly(store);

	}

	@DisplayName("존재하지 않는 식당을 조회하면 예외가 발생한다.")
	@Test
	void find_store_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("식당을 등록한다.")
	@Test
	void create_store_success(){
		//given
		StoreInfo storeInfo = createStoreInfo("사업자 등록 번호");
		StoreInfo saved = storeInfoRepository.save(storeInfo);
		StoreCreateRequest storeCreateRequest = createStoreRequest(saved.getId());
		//when
		StoreCreateResponse actual = sut.create(storeCreateRequest);
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("식당 계정 인증에 성공한다.")
	@Test
	void check_password_success(){
		//given
		String encryptedPassword = oneWayCipherService.encrypt("12341234");
		Store store = createStore(storeInfo, "storeTest@test.com", encryptedPassword);
		storeRepository.save(store);
		StoreAuthRequest storeAuthRequest = createStoreAuthRequest("storeTest@test.com", "12341234");
		
		//when
		AuthInfo actual = sut.checkPassword(storeAuthRequest);
		//then
		assertThat(actual).extracting("id", "roleType").containsExactly(store.getId(), RoleType.STORE);
	}

	@DisplayName("존재하지 않는 이메일로 인증을 시도하면 예외를 발생시킨다.")
	@Test
	void check_password_fail_by_not_found_email(){
		String encryptedPassword = oneWayCipherService.encrypt("12341234");
		Store store = createStore(storeInfo, "storeTest@test.com", encryptedPassword);
		storeRepository.save(store);
		StoreAuthRequest storeAuthRequest = createStoreAuthRequest("invalid@test.com", "12341234");

		assertThatThrownBy(() -> sut.checkPassword(storeAuthRequest)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("요청 비밀번호와 실제 비밀번호가 다르면 인증에 실패한다.")
	@Test
	void check_password_fail(){
		String encryptedPassword = oneWayCipherService.encrypt("12341234");
		Store store = createStore(storeInfo, "storeTest@test.com", encryptedPassword);
		storeRepository.save(store);
		StoreAuthRequest storeAuthRequest = createStoreAuthRequest("storeTest@test.com", "invalid");

		assertThatThrownBy(() -> sut.checkPassword(storeAuthRequest)).isInstanceOf(RuntimeException.class);
	}
	
	@DisplayName("식당이 탈퇴를 한다.")
	@Test
	void delete_store_success(){
		Store store = createStore(storeInfo, "storeTest@test.com", "12341234");
		storeRepository.save(store);

		StoreDeleteResponse delete = sut.delete(store.getId(), RoleType.STORE);

		 Store deletedStore = sut.findEntity(delete.getId());
		assertThat(deletedStore.getDeleteYN()).isEqualTo("Y");
	}

	@DisplayName("식당 탈퇴를 위한 권한이 없어서 예외가 발생한다.")
	@Test
	void delete_store_fail(){
		Store store = createStore(storeInfo, "storeTest@test.com", "12341234");
		storeRepository.save(store);

		assertThatThrownBy(() -> sut.delete(store.getId(), RoleType.COMPANY)).isInstanceOf(RuntimeException.class);
	}
	
	private StoreAuthRequest createStoreAuthRequest(String email, String password) {
		return StoreAuthRequest.builder()
			.email(email)
			.password(password)
			.build();
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

	private StoreCreateRequest createStoreRequest(UUID storeInfoId) {
		return StoreCreateRequest.builder()
			.storeInfoId(storeInfoId)
			.email("이메일")
			.password("비밀번호")
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


