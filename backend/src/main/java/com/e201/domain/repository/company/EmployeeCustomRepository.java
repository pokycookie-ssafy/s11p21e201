package com.e201.domain.repository.company;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.e201.domain.entity.company.Employee;

public interface EmployeeCustomRepository {
	Page<Employee> findPage(UUID departmentId, Pageable pageable);
}
