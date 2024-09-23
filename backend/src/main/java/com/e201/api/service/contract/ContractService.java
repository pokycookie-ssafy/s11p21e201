package com.e201.api.service.contract;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
import com.e201.domain.repository.contract.ContractRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class ContractService{

	private final ContractRepository contractRepository;

	public Contract findEntity(UUID id){
		return contractRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	@JtaTransactional
	public ContractCreateResponse create(String senderType, ContractCreateRequest request){
		Contract contract;
		switch (senderType){
			case "STORE":
				contract = request.toEntity(Status.COMPANY_WAITING);
				break;
			case "COMPANY":
				contract = request.toEntity(Status.STORE_WAITING);
				break;
			default:
				throw new RuntimeException("unknown sender type");
		}

<<<<<<< HEAD
<<<<<<< HEAD
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
=======
		try{
			Contract savedContract = contractRepository.save(contract);
			return new ContractCreateResponse(savedContract.getId());
		} catch (Exception e){
			throw new RuntimeException("failed to create contract");
		}
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
>>>>>>> b32c375 ([#17] refactor: ContractController 예외처리 수정)
	}

	@JtaTransactional
	public ContractRespondResponse respond(ContractRespondCondition request){
		Contract contract = contractRepository.findById(UUID.fromString(request.getContractId()))
			.orElseThrow(() -> new RuntimeException("not found exception"));

		switch(request.getRespondResult()){
			case "APPROVE":
				contract.update(Status.COMPLETE);
				break;
			case "REJECT":
				if (contract.getStatus() == Status.COMPANY_WAITING){
					contract.update(Status.COMPANY_REJECT);
				} else {
					contract.update(Status.STORE_REJECT);
				}
				break;
			default:
				throw new RuntimeException("unknown respond result");
		}

		return new ContractRespondResponse(contract.getId());
	}

	@JtaTransactional
	public void delete(String contractId){
		contractRepository.deleteById(UUID.fromString(contractId));
	}
}
