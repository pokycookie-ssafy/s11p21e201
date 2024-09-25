package com.e201.api.service.company;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyAccount;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyAccountRepository;
import com.e201.domain.repository.company.CompanyInfoRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.global.exception.EntityNotFoundException;

@SpringBootTest
@Transactional
class CompanyAccountServiceTest {

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyAccountRepository companyAccountRepository;

	@Autowired
	CompanyAccountService sut;

	Company company;

	CompanyInfo companyInfo;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo("사업자 등록증 번호");
		companyInfoRepository.save(companyInfo);

		company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);
	}

	@Transactional
	@DisplayName("기업 계좌(엔티티)을 조회한다.")
	@Test
	void find_companyAccount_entity_success() {
		// given
		CompanyAccount companyAccount = createCompanyAccount(company);
		companyAccountRepository.save(companyAccount);

		// when
		CompanyAccount actual = sut.findEntity(companyAccount.getId());

		//then
		assertThatCompanyAccountMatchExactly(actual);
	}

	@DisplayName("존재하지 않는 기업 계좌(엔티티)를 조회하면 예외가 발생한다.")
	@Test
	void find_companyAccount_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isExactlyInstanceOf(EntityNotFoundException.class);
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

	private CompanyAccount createCompanyAccount(Company company) {
		return CompanyAccount.builder()
			.company(company)
			.number("계좌번호")
			.bankCode("은행코드")
			.bankName("은행이름")
			.build();
	}

	private void assertThatCompanyAccountMatchExactly(CompanyAccount companyAccount) {
		assertThat(companyAccount)
			.extracting("number", "bankCode", "bankName")
			.containsExactly("계좌번호", "은행코드", "은행이름");
	}
}