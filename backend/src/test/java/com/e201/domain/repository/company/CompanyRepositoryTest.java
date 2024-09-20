package com.e201.domain.repository.company;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;

@SpringBootTest
class CompanyRepositoryTest {

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyRepository sut;

	CompanyInfo companyInfo;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo();
		companyInfoRepository.save(companyInfo);
	}

	@DisplayName("이메일로 기업 계정을 조회한다.")
	@Test
	void find_by_email_success() {
		// given
		Company company = createCompany("company@test.com", "12341234", companyInfo);
		sut.save(company);

		// when
		Company actual = sut.findByEmail(company.getEmail()).get();

		//then
		assertThat(actual).extracting("email", "password").containsExactly("company@test.com", "12341234");
	}

	@DisplayName("존재하지 않는 이메일로 기업 계정을 조회하면, 비어있는 값이 조회된다.")
	@Test
	void find_by_email_fail() {
		// given // when
		Optional<Company> actual = sut.findByEmail("invalid@test.com");

		//then
		assertThat(actual).isEmpty();
	}

	private Company createCompany(String email, String password, CompanyInfo companyInfo) {
		return Company.builder()
			.email(email)
			.password(password)
			.companyInfo(companyInfo)
			.build();
	}

	private CompanyInfo createCompanyInfo() {
		return CompanyInfo.builder()
			.name("사업장 이름")
			.phone("사업장 연락처")
			.businessAddress("사업장 주소")
			.businessType("사업 유형")
			.representativeName("사업자 대표 이름")
			.registerNumber("사업자 등록증 번호")
			.build();
	}
}