package com.e201.domain.repository.company;

import java.util.List;
import java.util.UUID;

import com.e201.domain.entity.company.Employee;

public interface EmployeeCustomRepository {
	List<Employee> findAllByDepartmentId(UUID companyId, UUID departmentId);
}
