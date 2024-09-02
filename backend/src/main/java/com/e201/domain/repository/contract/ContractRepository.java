package com.e201.domain.repository.contract;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.contract.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {
}
