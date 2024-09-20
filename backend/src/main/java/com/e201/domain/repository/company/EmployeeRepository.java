package com.e201.domain.repository.company;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

	Optional<Employee> findByCode(String code);
}
