package com.e201.api.service.contract;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Invoice;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.company.CompanyInfoRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.contract.InvoiceRepository;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
public class ContractServiceTest {

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	StoreInfoRepository	storeInfoRepository;

	@Autowired
	ContractRepository contractRepository;

	@Autowired
	ContractService sut;

	Company company;

	CompanyInfo companyInfo;

	Store store;
	StoreInfo storeInfo;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo("사업자 등록증 번호");
		companyInfoRepository.save(companyInfo);

		company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);

		storeInfo = createStoreInfo("사업자 등록증 번호");
		storeInfoRepository.save(storeInfo);

		store = createStore("store@test.com", "12341234", storeInfo);
		storeRepository.save(store);
	}

	@JtaTransactional
	@DisplayName("계약(Entity)를 조회한다.")
	@Test
	void find_contract_entity_success() {
		// given
		Contract contract = createContract(company.getId(), store.getId(), "PROGRESS", 10);
		contractRepository.save(contract);

		// when
		Contract actual = sut.findDomain(contract.getId());

		// then
		assertThatContractMatchExactly(actual, company.getId(), store.getId());
	}

	@DisplayName("존재하지 않는 계약(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_invoice_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findDomain(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	private Company createCompany(String email, String password, CompanyInfo companyInfo) {
		return Company.builder()
			.email(email)
			.password(password)
			.companyInfo(companyInfo)
			.build();
	}

	private CompanyInfo createCompanyInfo(String registerNumber) {
		return CompanyInfo.builder()
			.name("사업장 이름")
			.phone("사업장 연락처")
			.businessAddress("사업장 주소")
			.businessType("사업 유형")
			.representativeName("사업자 대표 이름")
			.registerNumber(registerNumber)
			.build();
	}

	private StoreInfo createStoreInfo(String registerNumber) {
		return StoreInfo.builder()
			.registerNumber(registerNumber)
			.name("식당 이름")
			.phone("식당 연락처")
			.businessType("식당 타입")
			.businessAddress("식당 주소")
			.representativeName("대표이름")
			.build();
	}

	private Store createStore(String email, String password, StoreInfo storeInfo){
		return Store.builder()
			.email(email)
			.password(password)
			.storeInfo(storeInfo)
			.build();
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
