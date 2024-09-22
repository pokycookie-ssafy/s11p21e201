package com.e201.api.service.contract;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
<<<<<<< HEAD
import com.e201.domain.entity.contract.ContractResponse;
import com.e201.domain.entity.contract.ContractStatus;
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.global.security.auth.constant.RoleType;

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
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
<<<<<<< HEAD
=======
	public ContractCreateResponse create(RoleType senderType, ContractCreateRequest request){
		Contract contract = createContractBySenderType(senderType, request);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
=======
=======
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		try{
			Contract savedContract = contractRepository.save(contract);
			return new ContractCreateResponse(savedContract.getId());
		} catch (Exception e){
			throw new RuntimeException("failed to create contract");
		}
<<<<<<< HEAD
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
>>>>>>> b32c375 ([#17] refactor: ContractController 예외처리 수정)
	}

	private Contract createContractBySenderType(RoleType senderType, ContractCreateRequest request){
		return switch (senderType) {
			case STORE -> request.toEntity(ContractStatus.STORE_REQUEST);
			case COMPANY -> request.toEntity(ContractStatus.COMPANY_REQUEST);
			default -> throw new IllegalArgumentException("Unknown sender type: " + senderType);
		};
	}

	@JtaTransactional
	public ContractRespondResponse respond(RoleType senderType, ContractRespondCondition request){
		Contract contract = contractRepository.findById(UUID.fromString(request.getContractId()))
			.orElseThrow(() -> new RuntimeException("not found exception"));

		ContractStatus status = updateContractStatus(contract, request.getRespondResult());
		contract.update(status);
		return new ContractRespondResponse(contract.getId());
	}

	private ContractStatus updateContractStatus(Contract contract, ContractResponse response){
		return switch(response){
			case APPROVE -> ContractStatus.COMPLETE;
			case REJECT -> contract.getStatus() == ContractStatus.COMPANY_REQUEST ? ContractStatus.STORE_REJECT : ContractStatus.COMPANY_REJECT;
			default -> throw new IllegalArgumentException("unknown respond result");
		};
=======
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
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
	}

	@JtaTransactional
	public void delete(String contractId){
<<<<<<< HEAD
		Contract contract = contractRepository.findById(UUID.fromString(contractId))
			.orElseThrow(() -> new RuntimeException("not found exception"));

		contract.delete();
=======
		contractRepository.deleteById(UUID.fromString(contractId));
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
	}
}
