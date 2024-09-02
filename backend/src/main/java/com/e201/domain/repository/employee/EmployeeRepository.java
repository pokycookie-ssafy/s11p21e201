package com.e201.domain.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.employee.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
