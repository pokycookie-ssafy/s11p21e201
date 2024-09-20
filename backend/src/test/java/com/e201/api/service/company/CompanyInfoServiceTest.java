package com.e201.api.service.company;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.api.controller.company.request.CompanyInfoCreateRequest;
import com.e201.api.controller.company.response.CompanyInfoCreateResponse;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyInfoRepository;

@SpringBootTest
class CompanyInfoServiceTest {

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyInfoService sut;

	@DisplayName("기업 정보를 저장한다.")
	@Test
	void create_companyInfo_success() {
		// given
		CompanyInfoCreateRequest request = createCompanyInfoCreateRequest();

		// when
		CompanyInfoCreateResponse actual = sut.create(request);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("기업 정보(엔티티)를 조회한다.")
	@Test
	void find_companyInfo_entity_success() {
		// given
		CompanyInfo companyInfo = createCompanyInfo();
		companyInfoRepository.save(companyInfo);

		// when
		CompanyInfo actual = sut.findEntity(companyInfo.getId());

		//then
		assertThatCompanyInfoMatchExactly(actual);
	}

	@DisplayName("존재하지 않는 기업 정보(엔티티)를 조회하면 예외가 발생한다.")
	@Test
	void find_companyInfo_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
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

	private CompanyInfoCreateRequest createCompanyInfoCreateRequest() {
		return CompanyInfoCreateRequest.builder()
			.name("사업장 이름")
			.phone("사업장 연락처")
			.businessAddress("사업장 주소")
			.businessType("사업 유형")
			.representativeName("사업자 대표 이름")
			.registerNumber("사업자 등록증 번호")
			.build();
	}

	private void assertThatCompanyInfoMatchExactly(CompanyInfo companyInfo) {
		assertThat(companyInfo)
			.extracting("name", "phone", "businessAddress", "businessType", "representativeName", "registerNumber")
			.containsExactly("사업장 이름", "사업장 연락처", "사업장 주소", "사업 유형", "사업자 대표 이름", "사업자 등록증 번호");
	}
}