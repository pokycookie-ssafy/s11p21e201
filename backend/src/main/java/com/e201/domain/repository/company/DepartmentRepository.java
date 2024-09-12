package com.e201.domain.repository.company;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Department;

public interface DepartmentRepository extends JpaRepository<Department, UUID> {
}
