package com.e201.domain.repository.store;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;

public interface StoreInfoRepository  extends JpaRepository<StoreInfo, UUID> {

}
