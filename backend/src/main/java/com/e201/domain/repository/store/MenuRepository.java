package com.e201.domain.repository.store;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.Menu;

public interface MenuRepository extends JpaRepository<Menu, UUID> {
	List<Menu> findByStoreId(UUID storeId);
}
