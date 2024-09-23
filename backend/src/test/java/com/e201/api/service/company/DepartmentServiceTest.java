package com.e201.api.service.company;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.e201.api.controller.company.request.department.DepartmentCreateRequest;
import com.e201.api.controller.company.response.department.DepartmentCreateResponse;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.company.Department;
import com.e201.domain.repository.company.CompanyInfoRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.domain.repository.company.DepartmentRepository;

@SpringBootTest
@Transactional
class DepartmentServiceTest {

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	DepartmentService sut;

	Company company;

	CompanyInfo companyInfo;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo("사업자 등록증 번호");
		companyInfoRepository.save(companyInfo);

		company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);
	}

	@DisplayName("부서를 저장한다.")
	@Test
	void create_department_success() {
		// given
		DepartmentCreateRequest request = createDepartmentCreateRequest(company.getId());

		// when
		DepartmentCreateResponse actual = sut.create(request);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("부서(엔티티)를 조회한다.")
	@Test
	void find_department_entity_success() {
	    // given
		Department department = createDepartment(company);
		departmentRepository.save(department);

		// when
		Department actual = sut.findEntity(department.getId());

		//then
		assertThatDepartmentMatchExactly(actual);
	}

	@DisplayName("존재하지 않는 부서(엔티티)를 조회하면 예외가 발생한다.")
	@Test
	void find_department_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	private DepartmentCreateRequest createDepartmentCreateRequest(UUID companyId) {
		return DepartmentCreateRequest.builder()
			.companyId(companyId)
			.code("부서코드")
			.name("부서이름")
			.build();
	}

	private Department createDepartment(Company company) {
		return Department.builder()
			.company(company)
			.code("부서코드")
			.name("부서이름")
			.build();
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

	private void assertThatDepartmentMatchExactly(Department department) {
		assertThat(department)
			.extracting("code", "name")
			.containsExactly("부서코드", "부서이름");
	}
}