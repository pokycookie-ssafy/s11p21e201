package com.e201.api.service.contract;

<<<<<<< HEAD
=======
import java.util.ArrayList;
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractFindResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.ContractResponse;
=======
=======
import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;
>>>>>>> df7e7ba ([#40] feat: Contract 조회 기능 구현)
=======
import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
import com.e201.domain.entity.contract.ContractRespondType;
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
import com.e201.domain.entity.contract.ContractStatus;
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.ContractResponse;
import com.e201.domain.entity.contract.ContractStatus;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class ContractService {

	private final ContractRepository contractRepository;

	@JtaTransactional
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
	public ContractCreateResponse create(RoleType senderType, ContractCreateRequest request){
=======
	public ContractCreateResponse create(RoleType senderType, ContractCreateRequest request) {
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
		Contract contract = createContractBySenderType(senderType, request);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
	public ContractCreateResponse create(RoleType senderType, ContractCreateRequest request){
		Contract contract = createContractBySenderType(senderType, request);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
=======
=======
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		try{
			Contract savedContract = contractRepository.save(contract);
			return new ContractCreateResponse(savedContract.getId());
		} catch (Exception e){
			throw new RuntimeException("failed to create contract");
		}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
>>>>>>> b32c375 ([#17] refactor: ContractController 예외처리 수정)
	}

	private Contract createContractBySenderType(RoleType senderType, ContractCreateRequest request) {
		return switch (senderType) {
			case STORE -> request.toEntity(ContractStatus.STORE_REQUEST);
			case COMPANY -> request.toEntity(ContractStatus.COMPANY_REQUEST);
			default -> throw new IllegalArgumentException("Unknown sender type: " + senderType);
		};
	}

	public Contract findEntity(UUID id) {
		return contractRepository.findByIdAndDeleteYN(id, "N")
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public UUID findContractId(UUID companyId, UUID storeId) {
<<<<<<< HEAD
		Contract contract = contractRepository.findContractByCompanyIdAndStoreIdAndDeleteYN(companyId, storeId, "N")
=======
		Contract contract = contractRepository.findContractByCompanyIdAndStoreIdAndDeleteYN(companyId, storeId,"N")
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
			.orElseThrow(() -> new RuntimeException("not found exception"));
		return contract.getId();
	}

<<<<<<< HEAD
	public List<ContractFindResponse> find(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond) {
		List<ContractFindResponse> response = contractRepository.findMyContracts(authInfo, status, cond, null, 10);
=======
	public List<ContractFindResponse> find(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond){
		List<ContractFindResponse> response = contractRepository.findMyContracts(authInfo, status, cond,null, 10);
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
		return response;
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
=======
=======
		Contract savedContract = contractRepository.save(contract);
		return new ContractCreateResponse(savedContract.getId());
>>>>>>> d4d2cc4 ([#17] refactor: ContractController 예외처리 수정)
=======
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
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
	}

	private ContractStatus updateContractStatus(Contract contract, ContractResponse response){
		return switch(response){
			case APPROVE -> ContractStatus.COMPLETE;
			case REJECT -> contract.getStatus() == ContractStatus.COMPANY_REQUEST ? ContractStatus.STORE_REJECT : ContractStatus.COMPANY_REJECT;
			default -> throw new IllegalArgumentException("unknown respond result");
		};
	}

	@JtaTransactional
<<<<<<< HEAD
	public void delete(String contractId){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
	public void delete(String contractId) {
<<<<<<< HEAD
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
		Contract contract = contractRepository.findById(UUID.fromString(contractId))
=======
		Contract contract = contractRepository.findByIdAndDeleteYN(UUID.fromString(contractId), "N")
>>>>>>> 13366f8 ([#40] feat: 계약 조회 기능 구현)
			.orElseThrow(() -> new RuntimeException("not found exception"));

<<<<<<< HEAD
		contract.delete();
<<<<<<< HEAD
=======
		contractRepository.deleteById(UUID.fromString(contractId));
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		contractRepository.deleteById(UUID.fromString(contractId));
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		contract.softDelete();
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
	}
}
