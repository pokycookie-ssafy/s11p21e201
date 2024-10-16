package com.e201.domain.repository.company;

import static com.e201.domain.entity.company.QCompany.*;
import static com.e201.domain.entity.company.QCompanyInfo.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.e201.domain.entity.company.Company;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CompanyCustomRepositoryImpl implements CompanyCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;

	public CompanyCustomRepositoryImpl(@Qualifier("companyJpaQueryFactory") JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public List<Company> findByRegisterNoWithCompanyInfo(String registerNo) {
		return jpaQueryFactory.selectFrom(company)
			.innerJoin(companyInfo).on(company.companyInfo.id.eq(companyInfo.id))
			.fetchJoin()
			.where(companyInfo.registerNumber.eq(registerNo))
			.fetch();
	}
}
