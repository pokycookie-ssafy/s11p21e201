package com.e201.api.service.contract;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractRespondType;
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.global.security.auth.constant.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class ContractService {

	private final ContractRepository contractRepository;

	@JtaTransactional
	public ContractCreateResponse create(RoleType senderType, ContractCreateRequest request) {
		Contract contract = createContractBySenderType(senderType, request);
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
	}

	private Contract createContractBySenderType(RoleType senderType, ContractCreateRequest request) {
		return switch (senderType) {
			case STORE -> request.toEntity(ContractStatus.STORE_REQUEST);
			case COMPANY -> request.toEntity(ContractStatus.COMPANY_REQUEST);
			default -> throw new IllegalArgumentException("Unknown sender type: " + senderType);
		};
	}

	public Contract findEntity(UUID id) {
		return contractRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	@JtaTransactional
	public ContractRespondResponse respond(RoleType senderType, ContractRespondCondition request) {
		Contract contract = contractRepository.findById(UUID.fromString(request.getContractId()))
			.orElseThrow(() -> new RuntimeException("not found exception"));

		ContractStatus status = updateContractStatus(contract, request.getRespondResult());
		contract.update(status);
		return new ContractRespondResponse(contract.getId());
	}

	private ContractStatus updateContractStatus(Contract contract, ContractRespondType response) {
		return switch (response) {
			case APPROVE -> ContractStatus.COMPLETE;
			case REJECT -> contract.getStatus() == ContractStatus.COMPANY_REQUEST ? ContractStatus.STORE_REJECT :
				ContractStatus.COMPANY_REJECT;
		};
	}

	@JtaTransactional
	public void delete(String contractId) {
		Contract contract = contractRepository.findById(UUID.fromString(contractId))
			.orElseThrow(() -> new RuntimeException("not found exception"));

		contract.softDelete();
	}
}
