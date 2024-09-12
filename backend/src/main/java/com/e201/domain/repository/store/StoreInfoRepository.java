package com.e201.domain.repository.store;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.StoreInfo;

public interface StoreInfoRepository  extends JpaRepository<StoreInfo, UUID> {
}
