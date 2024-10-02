package com.e201.api.service.store;

<<<<<<< HEAD
import java.util.List;
=======
import static com.e201.global.exception.ErrorCode.*;

import java.util.List;
import java.util.Optional;
>>>>>>> ad44aae ([#31] feat: 식당 메뉴 리스트 조회 기능 구현)
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.request.MenuUpdateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.controller.store.response.MenuDeleteResponse;
import com.e201.api.controller.store.response.MenuFindResponse;
import com.e201.api.controller.store.response.MenuUpdateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Store;
import com.e201.domain.repository.store.MenuRepository;
import com.e201.global.security.auth.constant.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class MenuService {

	private final MenuRepository menuRepository;
	private final StoreService storeService;

	@JtaTransactional
	public MenuCreateResponse create(UUID id, RoleType roleType, MenuCreateRequest menuCreateRequest){
		validationStore(roleType);
		Store store = storeService.findEntity(id);
		Menu menu = menuCreateRequest.toEntity(store);
		Menu savedMenu = menuRepository.save(menu);
		return new MenuCreateResponse(savedMenu.getId());
	}

	public Menu findEntity(UUID id) {
<<<<<<< HEAD
		return menuRepository.findByIdAndModifiedYNAndDeleteYN(id,"N","N")
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public MenuFindResponse findOne(UUID id){
		Menu menu = findEntity(id);
		return MenuFindResponse.builder()
			.id(id)
			.menuName(menu.getName())
			.price(menu.getPrice())
			.category(menu.getCategory())
			.build();
	}

	public List<MenuFindResponse> find(RoleType roleType, UUID id){
		validationStore(roleType);
		List<MenuFindResponse> responseList = menuRepository.findByStoreIdAndModifiedYNAndDeleteYN(id,"N","N")
			.stream()
			.map(menu -> new MenuFindResponse(menu.getId(), menu.getName(), menu.getPrice(), menu.getCategory()))  // Menu -> MenuFindResponse로 변환
			.toList();  // List<MenuFindResponse>로 수집
		return responseList;
=======
		return menuRepository.findByIdAndModifiedYNIsNullAndDeleteYNIsNull(id).orElseThrow(() -> new RuntimeException("not found exception"));
	// 	return menuRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));

>>>>>>> ebc4640 ([#31] 메뉴 조회 조건에 수정된 사항, 삭제 사항 반영)
	}

	public MenuFindResponse findOne(UUID id){
		Menu menu = findEntity(id);
		return MenuFindResponse.builder()
			.id(id)
			.menuName(menu.getName())
			.price(menu.getPrice())
			.build();
	}

	public List<MenuFindResponse> find(RoleType roleType, UUID id){
		validationStore(roleType);
		List<MenuFindResponse> responseList = menuRepository.findByStoreIdAndModifiedYNIsNullAndDeleteYNIsNull(id)
			.stream()
			.map(menu -> new MenuFindResponse(menu.getId(), menu.getName(), menu.getPrice()))  // Menu -> MenuFindResponse로 변환
			.toList();  // List<MenuFindResponse>로 수집
		return responseList;
	}

	@JtaTransactional
	public MenuUpdateResponse modify(RoleType roleType, UUID menuId, MenuUpdateRequest menuUpdateRequest){
		validationStore(roleType);
<<<<<<< HEAD
<<<<<<< HEAD
		Menu originMenu = findEntity(menuId);
=======
		Menu originMenu = menuRepository.findById(menuId)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EntityConstant.MENU.name()));
>>>>>>> f2404b4 ([#31] feat: 메뉴 단건 조회 기능 구현)
=======
		Menu originMenu = findEntity(menuId);
>>>>>>> 3f09ffd ([#31] fix: 직접 repository 부르는 행위를 service 메소드를 부르도록 변경)
		originMenu.softUpdate();
		//새롭게 menu 추가하기 
		Menu menu = createModifiedStoreEntity(menuUpdateRequest, originMenu);
		Menu modifiedMenu = menuRepository.save(menu);
		return new MenuUpdateResponse(modifiedMenu.getId());
	}

	@JtaTransactional
	public MenuDeleteResponse delete(UUID menuId,RoleType roleType){
		validationStore(roleType);
		Menu originMenu = findEntity(menuId);
		originMenu.softDelete();
		return new MenuDeleteResponse(originMenu.getId());
	}

	private Menu createModifiedStoreEntity(MenuUpdateRequest menuUpdateRequest, Menu originMenu) {
			return Menu.builder()
			.store(originMenu.getStore())
			.price(menuUpdateRequest.getPrice())
			.name(menuUpdateRequest.getName())
			.category(menuUpdateRequest.getCategory())
			.build();

	}

	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}
}
