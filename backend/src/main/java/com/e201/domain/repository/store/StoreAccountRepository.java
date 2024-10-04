package com.e201.domain.repository.store;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.StoreAccount;

public interface StoreAccountRepository extends JpaRepository<StoreAccount, UUID> {
	Optional<StoreAccount> findStoreAccountByStoreId(UUID storeId);
}
