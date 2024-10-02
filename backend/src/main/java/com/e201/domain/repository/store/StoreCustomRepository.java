package com.e201.domain.repository.store;

import java.util.List;

import com.e201.domain.entity.store.Store;

public interface StoreCustomRepository {
	List<Store> findByRegisterNoWithStoreInfo(String registerNo);
}
