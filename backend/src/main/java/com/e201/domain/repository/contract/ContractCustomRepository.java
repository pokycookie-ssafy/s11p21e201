package com.e201.domain.repository.contract;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.e201.api.controller.contract.response.ContractFindResponse;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;
import com.e201.global.security.auth.dto.AuthInfo;

public interface ContractCustomRepository {
	List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond,
		LocalDateTime lastContractDate, int pageSize);

	List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId);
}
