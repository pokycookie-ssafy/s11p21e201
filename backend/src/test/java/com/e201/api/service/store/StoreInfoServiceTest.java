package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.api.controller.store.response.StoreInfoFindResponse;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
@Transactional
class StoreInfoServiceTest {

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreInfoService sut;
	@Autowired
	private StoreRepository storeRepository;

	@DisplayName("식당 정보(엔티티)를 조회한다.")
	@Test
	void find_storeInfo_entity_success() {
		// given
		StoreInfo companyInfo = createStoreInfo();
		storeInfoRepository.save(companyInfo);

		// when
		StoreInfo actual = sut.findEntity(companyInfo.getId());

		//then
		assertThatStoreInfoMatchExactly(actual);
	}

	@DisplayName("존재하지 않는 식당 정보(엔티티)를 조회하면 예외가 발생한다.")
	@Test
	void find_storeInfo_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

	@DisplayName("식당 정보(엔티티)를 생성한다.")
	@Test
	void create_storeInfo_entity_success(){
		//given
		StoreInfoCreateRequest storeInfoCreateRequest = createStoreInfoRequest();

		//when
		StoreInfoCreateResponse response = sut.create(storeInfoCreateRequest);

		//then
		assertThat(response.getId()).isNotNull();
	}

	@DisplayName("식당 정보를 단건 조회한다.")
	@Test
	void find_one_store_info_success(){
		StoreInfo storeInfo = createStoreInfo();
		storeInfoRepository.save(storeInfo);
		//given
		Store store = createStore(storeInfo,"email","password");
		storeRepository.save(store);
		//when
		StoreInfoFindResponse storeInfoFindResponse = sut.findOne(store.getId());
		//then
		equalStoreInfoMatchExactly(storeInfoFindResponse, store, store.getStoreInfo());
	}

	private StoreInfoCreateRequest createStoreInfoRequest(){
		return StoreInfoCreateRequest.builder()
			.name("사업장 이름")
			.phone("사업장 연락처")
			.businessAddress("사업장 주소")
			.businessType("사업 유형")
			.representativeName("사업자 대표 이름")
			.registerNumber("사업자 등록증 번호")
			.build();
	}

	private StoreInfo createStoreInfo() {
		return StoreInfo.builder()
			.name("사업장 이름")
			.phone("사업장 연락처")
			.businessAddress("사업장 주소")
			.businessType("사업 유형")
			.representativeName("사업자 대표 이름")
			.registerNumber("사업자 등록증 번호")
			.build();
	}

	private void assertThatStoreInfoMatchExactly(StoreInfo storeInfo) {
		assertThat(storeInfo)
			.extracting("name", "phone", "businessAddress", "businessType", "representativeName", "registerNumber")
			.containsExactly("사업장 이름", "사업장 연락처", "사업장 주소", "사업 유형", "사업자 대표 이름", "사업자 등록증 번호");
	}

	private Store createStore(StoreInfo storeInfo, String email, String password) {
		return Store.builder()
			.storeInfo(storeInfo)
			.email(email)
			.password(password)
			.build();
	}

	private void equalStoreInfoMatchExactly(StoreInfoFindResponse storeInfoFindResponse,
		Store store,
		StoreInfo storeInfo) {
		assertThat(storeInfoFindResponse)
			.extracting("id", "name", "licenseNo", "address", "category","ownerName","phone")
			.containsExactly(store.getId(), storeInfo.getName(),
				storeInfo.getRegisterNumber(), storeInfo.getBusinessAddress(),
				storeInfo.getBusinessType(),storeInfo.getRepresentativeName(),storeInfo.getPhone());
	}

}