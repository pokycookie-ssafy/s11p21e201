package com.e201.domain.repository.store;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.store.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
