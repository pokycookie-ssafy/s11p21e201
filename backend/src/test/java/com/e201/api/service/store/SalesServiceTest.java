package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Sales;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.MenuRepository;
import com.e201.domain.repository.store.SalesRepository;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
class SalesServiceTest {

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	MenuRepository menuRepository;

	@Autowired
	SalesRepository salesRepository;

	@Autowired
	SalesService sut;

	StoreInfo storeInfo;

	Store store;

	Menu menu;

	@BeforeEach
	void setUp() {
		storeInfo = createStoreInfo();
		storeInfoRepository.save(storeInfo);

		store = createStore(storeInfo, "storeTest@test.com", "12341234");
		storeRepository.save(store);

		menu = createMenu();
		menuRepository.save(menu);
	}

	@Transactional
	@DisplayName("판매기록(엔티티)을 조회한다")
	@Test
	void find_sales_entity_success() {
		// given
		UUID companyId = UUID.randomUUID();
		Sales sales = createSales(menu, companyId);
		salesRepository.save(sales);

		//when
		Sales actual = sut.findEntity(sales.getId());

		//then
		assertThat(actual.getId()).isEqualTo(sales.getId());
		assertThat(actual.getCompanyId()).isEqualTo(companyId);
		assertThat(actual.getMenu().getId()).isEqualTo(menu.getId());
	}

	@DisplayName("존재하지 않는 판매기록(엔티티)을 조회하면 예외가 발생한다. ")
	@Test
	void find_sales_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

	private Sales createSales(Menu menu, UUID companyId) {
		return Sales.builder()
			.menu(menu)
			.companyId(companyId)
			.build();
	}

	private Menu createMenu() {
		return Menu.builder()
			.store(store)
			.price(5000)
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

	private Store createStore(StoreInfo storeInfo, String email, String password) {
		return Store.builder()
			.storeInfo(storeInfo)
			.email(email)
			.password(password)
			.build();
	}
}