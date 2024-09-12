package com.e201.api.service.store;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
class StoreServiceTest {

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	StoreService storeService;

	@Transactional
	@DisplayName("식당 계정(엔티티)를 조회한다.")
	@Test
	void find_store_entity_success(){
		//given
		// Store store =
		//when

		//then
	}

}

