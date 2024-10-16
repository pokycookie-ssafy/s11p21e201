package com.e201.domain.repository.company;

import static com.e201.domain.entity.company.QDepartment.*;
import static com.e201.domain.entity.company.QEmployee.*;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;

import com.e201.domain.entity.company.Employee;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class EmployeeCustomRepositoryImpl implements EmployeeCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;

	public EmployeeCustomRepositoryImpl(@Qualifier("companyJpaQueryFactory") JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public List<Employee> findAllByDepartmentId(UUID companyId, UUID departmentId) {
		return jpaQueryFactory
			.selectFrom(employee)
			.join(employee.department, department).fetchJoin()
			.where(
				matchCompany(companyId),
				matchDepartment(departmentId)
			)
			.fetch();
	}

	private BooleanExpression matchCompany(UUID companyId) {
		if (companyId != null) {
			return department.company.id.eq(companyId);
		}
		return null;
	}

	private BooleanExpression matchDepartment(UUID departmentId) {
		if (departmentId != null) {
			return department.id.eq(departmentId);
		}
		return null;
	}
}
