package com.e201.api.service.store;

import static com.e201.global.exception.ErrorCode.*;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.request.MenuUpdateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.controller.store.response.MenuDeleteResponse;
import com.e201.api.controller.store.response.MenuFindResponse;
import com.e201.api.controller.store.response.MenuUpdateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.EntityConstant;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Store;
import com.e201.domain.repository.store.MenuRepository;
import com.e201.global.exception.EntityNotFoundException;
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
		return menuRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public MenuFindResponse findOne(UUID id){
		Menu menu = findEntity(id);
		return MenuFindResponse.builder()
			.id(id)
			.menuName(menu.getName())
			.price(menu.getPrice())
			.build();
	}

	@JtaTransactional
	public MenuUpdateResponse modify(RoleType roleType, UUID menuId, MenuUpdateRequest menuUpdateRequest){
		validationStore(roleType);
		Menu originMenu = menuRepository.findById(menuId)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EntityConstant.MENU.name()));
		originMenu.softUpdate();
		//새롭게 menu 추가하기 
		Menu menu = createModifiedStoreEntity(menuUpdateRequest, originMenu);
		Menu modifiedMenu = menuRepository.save(menu);
		return new MenuUpdateResponse(modifiedMenu.getId());
	}

	@JtaTransactional
	public MenuDeleteResponse delete(UUID menuId,RoleType roleType){
		validationStore(roleType);
		Menu originMenu = menuRepository.findById(menuId)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EntityConstant.MENU.name()));

		originMenu.softDelete();
		return new MenuDeleteResponse(originMenu.getId());
	}

	private Menu createModifiedStoreEntity(MenuUpdateRequest menuUpdateRequest, Menu originMenu) {
			return Menu.builder()
			.store(originMenu.getStore())
			.price(menuUpdateRequest.getPrice())
			.name(originMenu.getName())
			.build();

	}

	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}
}
