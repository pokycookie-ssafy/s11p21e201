package com.e201.domain.repository.contract;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.contract.Contract;

public interface ContractRepository extends JpaRepository<Contract, UUID>, ContractCustomRepository {
	Optional<Contract> findByIdAndDeleteYN(UUID id, String deleteYN);
	Optional<Contract> findContractByCompanyIdAndStoreIdAndDeleteYN(UUID companyId, UUID storeId, String deleteYN);
}
