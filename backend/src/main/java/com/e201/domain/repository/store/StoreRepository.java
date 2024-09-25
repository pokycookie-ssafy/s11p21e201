package com.e201.domain.repository.store;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.Store;

public interface StoreRepository extends JpaRepository<Store, UUID> {
	Optional<Store> findByEmail(String email);
}
