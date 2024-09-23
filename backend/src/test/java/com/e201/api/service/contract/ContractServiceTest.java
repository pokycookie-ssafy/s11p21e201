package com.e201.api.service.contract;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
import com.e201.domain.repository.contract.ContractRepository;

@SpringBootTest
public class ContractServiceTest {

	@Autowired
	ContractRepository contractRepository;

	@Autowired
	ContractService sut;

	@JtaTransactional
	@DisplayName("계약(Entity)를 조회한다.")
	@Test
	void find_contract_entity_success() {
		UUID companyId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();

		// given
		Contract contract = createContract(companyId, storeId, Status.COMPANY_WAITING, 10);
		contractRepository.save(contract);

		// when
		Contract actual = sut.findEntity(contract.getId());

		// then
		assertThatContractMatchExactly(actual, companyId, storeId);
	}

	@DisplayName("존재하지 않는 계약(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_invoice_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기업이 계약 정보(Entity)를 저장한다.")
	@Test
	void company_create_contract_entity_success(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
		ContractCreateResponse actual = sut.create("COMPANY", request);
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("식당이 계약 정보(Entity)를 저장한다.")
	@Test
	void store_create_contract_entity_success(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
		ContractCreateResponse actual = sut.create("STORE", request);
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("계약 정보(Entity)를 저장을 실패 시 예외가 발생한다.")
	@Test
	void create_contract_entity_fail(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
		ContractCreateResponse actual = sut.create("STORE", request);
		//expect
		assertThatThrownBy(() -> sut.create(" ", request)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기존의 계약 id가 존재 하지 않을 경우 예외가 발생한다.")
	@Test
	void find_exist_contract_entity_fail(){
		//given
		String contractId = UUID.randomUUID().toString();
		ContractRespondCondition contractRespond = createContractRespondCondition(contractId,"APPROVE");

		//expect
		assertThatThrownBy(() -> sut.respond(contractRespond)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("계약을 수락한다.")
	@Test
	void update_contract_approve_success(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create("STORE", contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,"APPROVE");

		//when
		ContractRespondResponse actual = sut.respond(request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(Status.COMPLETE);
	}

	@DisplayName("잘못된 Respond가 전송될 경우 예외가 발생한다.")
	@Test
	void update_contract_approve_fail(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create("STORE", contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,"");

		//expect
		assertThatThrownBy(() -> sut.respond(request)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기업이 계약을 거절한다.")
	@Test
	void update_contract_reject_by_company_success(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create("STORE", contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,"REJECT");

		//when
		ContractRespondResponse actual = sut.respond(request);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("식당이 계약을 거절한다.")
	@Test
	void update_contract_reject_by_store_success(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create("COMPANY", contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,"REJECT");

		//when
		ContractRespondResponse actual = sut.respond(request);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	private ContractRespondCondition createContractRespondCondition(String contractId, String respondResult){
		return ContractRespondCondition.builder()
			.contractId(contractId)
			.respondResult(respondResult)
			.build();
	}

	private ContractCreateRequest createContractCreateRequest (String companyId, String storeId) {
		return ContractCreateRequest.builder()
			.companyId(companyId)
			.storeId(storeId)
			.sattlementDate(10)
			.build();
	}

	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.status(status)
			.sattlementDate(sattlementDate)
			.build();
	}

	private void assertThatContractMatchExactly(Contract contract, UUID companyId, UUID storeId) {
		assertThat(contract)
			.extracting("companyId", "storeId", "status", "sattlementDate")
			.containsExactly(companyId, storeId, Status.COMPANY_WAITING,10);
	}
}
