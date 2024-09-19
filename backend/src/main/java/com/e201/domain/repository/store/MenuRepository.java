package com.e201.domain.repository.store;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.Menu;

public interface MenuRepository extends JpaRepository<Menu, UUID> {
}
