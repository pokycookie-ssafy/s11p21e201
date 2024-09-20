package com.e201.domain.repository.company;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Company;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

	Optional<Company> findByEmail(String email);
}
