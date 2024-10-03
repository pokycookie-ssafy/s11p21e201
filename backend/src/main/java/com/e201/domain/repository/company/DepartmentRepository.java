package com.e201.domain.repository.company;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;

public interface DepartmentRepository extends JpaRepository<Department, UUID> {

	List<Department> findAllByCompany(Company company);
}
