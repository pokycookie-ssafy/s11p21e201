package com.e201.global.db.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Configuration
public class QueryDslConfig {

	@PersistenceContext(unitName = "adminEntityManager")
	private EntityManager adminEntityManager;

	@PersistenceContext(unitName = "companyEntityManager")
	private EntityManager companyEntityManager;

	@PersistenceContext(unitName = "contractEntityManager")
	private EntityManager contractEntityManager;

	@PersistenceContext(unitName = "paymentEntityManager")
	private EntityManager paymentEntityManager;

	@PersistenceContext(unitName = "storeEntityManager")
	private EntityManager storeEntityManager;

	@Bean(name = "adminJpaQueryFactory")
	public JPAQueryFactory adminJpaQueryFactory() {
		return new JPAQueryFactory(adminEntityManager);
	}

	@Bean(name = "companyJpaQueryFactory")
	public JPAQueryFactory companyJpaQueryFactory() {
		return new JPAQueryFactory(companyEntityManager);
	}

	@Bean(name = "contractJpaQueryFactory")
	public JPAQueryFactory contractJpaQueryFactory() {
		return new JPAQueryFactory(contractEntityManager);
	}

	@Bean(name = "paymentJpaQueryFactory")
	public JPAQueryFactory paymentJpaQueryFactory() {
		return new JPAQueryFactory(paymentEntityManager);
	}

	@Bean(name = "storeJpaQueryFactory")
	public JPAQueryFactory storeJpaQueryFactory() {
		return new JPAQueryFactory(storeEntityManager);
	}
}
