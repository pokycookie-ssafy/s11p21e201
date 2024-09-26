package com.e201.api.service.store;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.MenuCreateRequest;
import com.e201.api.controller.store.request.MenuUpdateRequest;
import com.e201.api.controller.store.response.MenuCreateResponse;
import com.e201.api.controller.store.response.MenuUpdateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.EntityConstant;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.MenuStatus;
import com.e201.domain.entity.store.Store;
import com.e201.domain.repository.store.MenuRepository;
import com.e201.global.exception.EntityNotFoundException;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

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
		menu.changeFlag(MenuStatus.CREATED);
		Menu savedMenu = menuRepository.save(menu);
		return new MenuCreateResponse(savedMenu.getId());
	}

	public Menu findEntity(UUID id) {
		return menuRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public MenuUpdateResponse modify(UUID id, RoleType roleType, MenuUpdateRequest menuUpdateRequest){
		validationStore(roleType);
		Menu originMenu = menuRepository.findById(menuUpdateRequest.getId())
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, EntityConstant.MENU.name()));

		changeMenuPrice(originMenu ,MenuStatus.MODIFIED);
		//새롭게 menu 추가하기 
		Menu menu = createModifiedStoreEntity(menuUpdateRequest, originMenu);
		Menu modifiedMenu = menuRepository.save(menu);
		return new MenuUpdateResponse(modifiedMenu.getId());
	}

	private static Menu createModifiedStoreEntity(MenuUpdateRequest menuUpdateRequest, Menu originMenu) {
		Menu menu = Menu.builder()
			.store(originMenu.getStore())
			.price(menuUpdateRequest.getPrice())
			.name(originMenu.getName())
			.status(MenuStatus.CREATED).build();
		return menu;
	}

	private void validationStore(RoleType roleType) {
		if (roleType != RoleType.STORE) {
			throw new RuntimeException("store validation error");
		}
	}

	private void changeMenuPrice(Menu menu,MenuStatus status) {
		menu.changeFlag(status);
	}

}
