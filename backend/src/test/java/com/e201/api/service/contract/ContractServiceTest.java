package com.e201.api.service.contract;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
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
		Contract contract = createContract(companyId, storeId, "PROGRESS", 10);
		contractRepository.save(contract);

		// when
		Contract actual = sut.findDomain(contract.getId());

		// then
		assertThatContractMatchExactly(actual, companyId, storeId);
	}

	@DisplayName("존재하지 않는 계약(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_invoice_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findDomain(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

	private Contract createContract(UUID companyId, UUID storeId, String status, int sattlementDate){
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
			.containsExactly(companyId, storeId, "PROGRESS",10);
	}
}
