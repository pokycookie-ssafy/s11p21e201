package com.e201.domain.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
