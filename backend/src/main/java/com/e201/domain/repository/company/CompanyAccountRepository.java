package com.e201.domain.repository.company;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.CompanyAccount;

public interface CompanyAccountRepository extends JpaRepository<CompanyAccount, UUID> {
	Optional<CompanyAccount> findCompanyAccountByCompanyId(UUID companyId);
}
