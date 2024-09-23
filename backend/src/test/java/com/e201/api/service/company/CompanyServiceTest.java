package com.e201.api.service.company;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.api.controller.company.request.company.CompanyAuthRequest;
import com.e201.api.controller.company.request.company.CompanyCreateRequest;
import com.e201.api.controller.company.response.company.CompanyCreateResponse;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyInfoRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

@SpringBootTest
@Transactional
class CompanyServiceTest {

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	CompanyService sut;

	@Autowired
	OneWayCipherService oneWayCipherService;

	CompanyInfo companyInfo;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo();
		companyInfoRepository.save(companyInfo);
	}

	@DisplayName("기업 계정을 저장한다.")
	@Test
	void create_company_success() {
		// given
		CompanyCreateRequest request = createCompanyCreateRequest(companyInfo.getId());

		// when
		CompanyCreateResponse actual = sut.create(request);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("인증에 성공한다.")
	@Test
	void check_password_success() {
		// given
		String encryptedPassword = oneWayCipherService.encrypt("12341234");
		Company company = createCompany("company@test.com", encryptedPassword, companyInfo);
		companyRepository.save(company);
		CompanyAuthRequest request = createCompanyAuthRequest("company@test.com", "12341234");

		// when
		AuthInfo actual = sut.checkPassword(request);

		//then
		assertThat(actual).extracting("id", "roleType").containsExactly(company.getId(), RoleType.COMPANY);
	}

	@DisplayName("존재하지 않는 이메일로 인증을 시도하면 예외가 발생한다.")
	@Test
	void check_password_fail_by_not_found_email() {
		// given
		Company company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);
		CompanyAuthRequest request = createCompanyAuthRequest("invalid@test.com", "12341234");

		// when //then
		assertThatThrownBy(() -> sut.checkPassword(request)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("요청 비밀번호와 실제 비밀번호가 다르면 인증에 실패한다.")
	@Test
	void check_password_fail() {
		// given
		Company company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);
		CompanyAuthRequest request = createCompanyAuthRequest("company@test.com", "invalid_password");

		// when //then
		assertThatThrownBy(() -> sut.checkPassword(request)).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기업 계정(엔티티)을 조회한다.")
	@Test
	void find_company_entity_success() {
		// given
		Company company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);

		// when
		Company actual = sut.findEntity(company.getId());

		//then
		assertThatCompanyMatchExactly(actual);
	}

	@DisplayName("존재하지 않는 기업 계정(엔티티)을 조회하면 예외가 발생한다.")
	@Test
	void find_company_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	private CompanyCreateRequest createCompanyCreateRequest(UUID companyInfoId) {
		return CompanyCreateRequest.builder()
			.companyInfoId(companyInfoId)
			.email("company@test.com")
			.password("12341234")
			.build();
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

	private CompanyAuthRequest createCompanyAuthRequest(String email, String password) {
		return CompanyAuthRequest.builder()
			.email(email)
			.password(password)
			.build();
	}

	private void assertThatCompanyMatchExactly(Company findCompany) {
		assertThat(findCompany)
			.extracting("email", "password")
			.containsExactly("company@test.com", "12341234");
	}
}