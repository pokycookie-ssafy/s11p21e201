package com.e201.domain.repository.store;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;


import com.e201.domain.entity.store.Store;

import com.querydsl.jpa.impl.JPAQueryFactory;

import static com.e201.domain.entity.store.QStore.store;
import static com.e201.domain.entity.store.QStoreInfo.storeInfo;
import static com.querydsl.jpa.JPAExpressions.*;

import java.util.List;

@Repository
public class StoreCustomRepositoryImpl implements StoreCustomRepository{
	private final JPAQueryFactory jpaQueryFactory;

	public StoreCustomRepositoryImpl(@Qualifier("storeJpaQueryFactory") JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public List<Store> findByRegisterNoWithStoreInfo(String registerNo) {
		return jpaQueryFactory.selectFrom(store)
			.innerJoin(storeInfo).on(store.storeInfo.id.eq(storeInfo.id))
			.fetchJoin()
			.where(storeInfo.registerNumber.eq(registerNo))  // register_number 조건
			.fetch();
	}
}
