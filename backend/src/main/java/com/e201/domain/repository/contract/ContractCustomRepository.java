package com.e201.domain.repository.contract;

import java.util.List;
import java.util.UUID;

import com.e201.api.controller.contract.request.ContractFindRequest;
import com.e201.api.controller.contract.response.ContractFindResponse;
import com.e201.api.controller.contract.response.EmployeeFindStoreResponse;
import com.e201.domain.entity.contract.Contract;
import com.e201.global.security.auth.dto.AuthInfo;

public interface ContractCustomRepository {
	List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindRequest request);

	List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId);

	List<EmployeeFindStoreResponse> findStores(AuthInfo authInfo);
}
