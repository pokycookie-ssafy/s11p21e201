package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.store.Menu;
import com.e201.domain.repository.store.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;

	public Menu findEntity(UUID id) {
		return menuRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
