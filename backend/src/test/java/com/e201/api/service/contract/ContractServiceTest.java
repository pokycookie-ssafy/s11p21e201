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
import com.e201.domain.entity.contract.ContractResponse;
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.global.security.auth.constant.RoleType;

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
		Contract contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
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
	void company_create_contract_entity_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
		ContractCreateResponse actual = sut.create(RoleType.COMPANY, request);
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("계약 생성 시 잘못된 senderType이 전달될 경우 실패한다.")
	@Test
	void company_create_contract_entity_fail() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//expect
		assertThatThrownBy(() -> sut.create(RoleType.EMPLOYEE, request)).isInstanceOf(
			IllegalArgumentException.class);
	}

	@DisplayName("식당이 계약 정보(Entity)를 저장한다.")
	@Test
	void store_create_contract_entity_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
		ContractCreateResponse actual = sut.create(RoleType.STORE, request);
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("계약 정보(Entity)를 저장을 실패 시 예외가 발생한다.")
	@Test
	void create_contract_entity_fail() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
		ContractCreateResponse actual = sut.create(RoleType.STORE, request);
		//expect
		assertThatThrownBy(() -> sut.create(null, request)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기존의 계약 id가 존재 하지 않을 경우 예외가 발생한다.")
	@Test
	void find_exist_contract_entity_fail() {
		//given
		String contractId = UUID.randomUUID().toString();
		ContractRespondCondition contractRespond = createContractRespondCondition(contractId, ContractResponse.APPROVE);

		//expect
		assertThatThrownBy(() -> sut.respond(RoleType.STORE, contractRespond)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("계약을 수락한다.")
	@Test
	void update_contract_approve_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractResponse.APPROVE);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.STORE, request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPLETE);
	}

	@DisplayName("잘못된 Respond가 전송될 경우 예외가 발생한다.")
	@Test
	void update_contract_approve_fail() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, null);

		//expect
		assertThatThrownBy(() -> sut.respond(RoleType.STORE, request)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기업이 계약을 거절한다.")
	@Test
	void update_contract_reject_by_company_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractResponse.REJECT);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPANY_REJECT);
	}

	@DisplayName("식당이 계약을 거절한다.")
	@Test
	void update_contract_reject_by_store_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractResponse.REJECT);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.STORE_REJECT);
	}

	@DisplayName("계약을 삭제한다.")
	@Test
	void delete_contract_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);

		String contractId = contract.getId().toString();

		//when
		sut.delete(contractId);

		//then
		Contract contractResult = sut.findEntity(UUID.fromString(contractId));
		assertThat(contractResult).extracting("deleteYN").isEqualTo("Y");
	}

	private ContractRespondCondition createContractRespondCondition(String contractId, ContractResponse respondResult) {
		return ContractRespondCondition.builder()
			.contractId(contractId)
			.respondResult(respondResult)
			.build();
	}

	private ContractCreateRequest createContractCreateRequest(String companyId, String storeId) {
		return ContractCreateRequest.builder()
			.companyId(companyId)
			.storeId(storeId)
			.settlementDate(10)
			.build();
	}

	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate) {
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.status(contractStatus)
			.settlementDate(settlementDate)
			.build();
	}

	private void assertThatContractMatchExactly(Contract contract, UUID companyId, UUID storeId) {
		assertThat(contract)
			.extracting("companyId", "storeId", "status", "settlementDate")
			.containsExactly(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
	}
}
