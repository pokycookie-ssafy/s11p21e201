package com.e201.api.service.contract;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
<<<<<<< Updated upstream
import com.e201.domain.entity.contract.Invoice;
import com.e201.domain.entity.contract.Status;
=======
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.contract.Invoice;
>>>>>>> Stashed changes
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.contract.InvoiceRepository;

@SpringBootTest
public class InvoiceServiceTest {
	@Autowired
	ContractRepository contractRepository;

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Autowired
	InvoiceService sut;

	Contract contract;

	@BeforeEach
	void setUp() {
		UUID companyId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();

		contract = createContract(companyId, storeId, Status.COMPANY_WAITING, 10);
		contractRepository.save(contract);
	}

	@JtaTransactional
	@DisplayName("세금계산서(Entity)를 조회한다.")
	@Test
	void find_invoice_entity_success() {
		// given
		Invoice invoice = createInvoice("/img.jpg", contract);
		invoiceRepository.save(invoice);

		// when
		Invoice actual = sut.findDomain(invoice.getId());

		// then
		assertThat(actual.getImageUrl())
			.isEqualTo("/img.jpg");
	}

	@DisplayName("존재하지 않는 세금계산서(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_invoice_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findDomain(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

<<<<<<< Updated upstream
	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
=======
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate) {
>>>>>>> Stashed changes
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.status(status)
			.sattlementDate(sattlementDate)
			.build();
	}

	private Invoice createInvoice(String img_url, Contract contract) {
		return Invoice.builder()
			.contract(contract)
			.imageUrl(img_url)
			.build();
	}
}
