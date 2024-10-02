package com.e201.domain.repository.company;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Manager;

public interface ManagerRepository extends JpaRepository<Manager, UUID> {

	Optional<Manager> findByCode(String code);

	@Query("select m from Manager m where m.department.company = :company")
	Page<Manager> findAllByCompany(@Param("company") Company company, Pageable pageable);
}
