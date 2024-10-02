package com.e201.api.service.store;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.request.MenuUpdateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.controller.store.response.MenuDeleteResponse;
import com.e201.api.controller.store.response.MenuFindResponse;
import com.e201.api.controller.store.response.MenuUpdateResponse;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.store.MenuRepository;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;
import com.e201.global.security.auth.constant.RoleType;

@SpringBootTest
@Transactional
class MenuServiceTest {

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	MenuRepository menuRepository;

	@Autowired
	MenuService sut;

	StoreInfo storeInfo;

	Store store;

	@BeforeEach
	void setUp() {
		storeInfo = createStoreInfo();
		storeInfoRepository.save(storeInfo);

		store = createStore(storeInfo, "storeTest@test.com", "12341234");
		storeRepository.save(store);
	}

	@DisplayName("메뉴(엔티티)를 조회한다.")
	@Test
	void find_menu_entity_success() {
		// given
		Menu menu = createMenu();
		menuRepository.save(menu);

		// when
		Menu actual = sut.findEntity(menu.getId());

		// then
		assertThat(actual.getPrice()).isEqualTo(menu.getPrice());
	}

	@DisplayName("존재하지 않는 메뉴(엔티티)를 조회하면 예외가 발생한다.")
	@Test
	void find_menu_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

	@DisplayName("메뉴를 생성한다.")
	@Test
	void create_menu_entity_success() {
		//given
		MenuCreateRequest menuCreateRequest = createMenuRequest(store.getId());

		//when
		MenuCreateResponse actual = sut.create(store.getId(), RoleType.STORE, menuCreateRequest);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("메뉴 생성을 실패한다.")
	@Test
	void create_menu_entity_fail() {
		//given
		MenuCreateRequest menuCreateRequest = createMenuRequest(store.getId());

		//then
		assertThatThrownBy(() -> sut.create(UUID.randomUUID(), RoleType.COMPANY, menuCreateRequest)).isInstanceOf(
			RuntimeException.class);
	}

	@DisplayName("메뉴를 수정한다.")
	@Test
	void update_menu_entity_success() {
		//given
		Menu menu = createMenu();
		Menu saveMenu = menuRepository.save(menu);
		MenuUpdateRequest request = createMenuUpdateRequest(menu);

		//when
		MenuUpdateResponse response = sut.modify(RoleType.STORE, saveMenu.getId(), request);

		//then
		assertThat(response.getId()).isNotEqualTo(menu.getId());

	}

	@DisplayName("메뉴를 삭제한다.")
	@Test
	void delete_menu_entity_success() {
		//given
		Menu menu = createMenu();
		menuRepository.save(menu);

		//when
		MenuDeleteResponse delete = sut.delete(menu.getId(), RoleType.STORE);

		//then
		assertThat(delete.getId()).isNotNull();
	}

	@DisplayName("하나의 메뉴를 조회한다.")
	@Test
	void findOne_menu_entity_success() {
		//given
		Menu menu = createMenu();
		Menu saveMenu = menuRepository.save(menu);

		//when
		MenuFindResponse menuFindResponse = sut.findOne(saveMenu.getId());

		//then
		assertThatMenuMatchExactly(menuFindResponse, saveMenu.getId());
	}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1237fe7 ([#31] test: 식당 메뉴 리스트 조회 기능 테스트)
	@DisplayName("한 식당의 여러 메뉴를 조회한다.")
	@Test
	void findAll_menu_entity_success() {
		Menu menu = createMenu();
		Menu menu1 = createMenu();
		Menu menu2 = createMenu();
		menuRepository.save(menu);
		menuRepository.save(menu1);
		menuRepository.save(menu2);

		//when
		List<MenuFindResponse> menuFindResponses = sut.find(RoleType.STORE, store.getId());

		//then
		assertThat(menuFindResponses.size()).isEqualTo(3);
	}

	@DisplayName("인증 오류로 인해 식당의 여러 메뉴를 조회하는데 예외 처리가 발생한다. ")
	@Test
	void findAll_menu_entity_fail() {
		Menu menu = createMenu();
		Menu menu1 = createMenu();
		Menu menu2 = createMenu();
		menuRepository.save(menu);
		menuRepository.save(menu1);
		menuRepository.save(menu2);

		//then
		assertThatThrownBy(() -> sut.find(RoleType.COMPANY, store.getId())).isInstanceOf(RuntimeException.class);

	}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1047472 ([#31] test: 메뉴 단건 조회 기능 테스트)
=======
>>>>>>> 1237fe7 ([#31] test: 식당 메뉴 리스트 조회 기능 테스트)
=======

>>>>>>> 9b4834a ([#70] chore: 필드명 변경)
	private MenuCreateRequest createMenuRequest(UUID id) {
		return MenuCreateRequest.builder()
			.price(10000)
			.category("음료")
			.build();
	}

	private MenuUpdateRequest createMenuUpdateRequest(Menu menu) {
		return MenuUpdateRequest.builder()
			.menuName(menu.getName())
			.price(33433)
			.category("음료")
			.build();
	}

	private Menu createMenu() {
		return Menu.builder()
			.store(store)
			.name("메뉴이름")
			.price(5000)
			.category("음료")
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

	private void assertThatMenuMatchExactly(MenuFindResponse menu, UUID menuId) {
		assertThat(menu)
			.extracting("id", "name", "price")
			.containsExactly(menuId, "메뉴이름", 5000);
	}
}