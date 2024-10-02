package com.e201.domain.repository.company;

import static com.e201.domain.entity.company.QDepartment.*;
import static com.e201.domain.entity.company.QEmployee.*;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import com.e201.domain.entity.company.Employee;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class EmployeeCustomRepositoryImpl implements EmployeeCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;

	public EmployeeCustomRepositoryImpl(@Qualifier("companyJpaQueryFactory") JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public Page<Employee> findPage(UUID departmentId, Pageable pageable) {
		List<Employee> employees = jpaQueryFactory
			.selectFrom(employee)
			.where(matchDepartment(departmentId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		JPAQuery<Long> countQuery = jpaQueryFactory
			.select(employee.count())
			.from(employee)
			.where(matchDepartment(departmentId));
		return PageableExecutionUtils.getPage(employees, pageable, countQuery::fetchFirst);
	}

	private BooleanExpression matchDepartment(UUID departmentId) {
		if (departmentId != null) {
			return department.id.eq(departmentId);
		}
		return null;
	}
}
