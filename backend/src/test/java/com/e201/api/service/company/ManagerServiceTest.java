package com.e201.api.service.company;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.api.controller.company.request.DepartmentCreateRequest;
import com.e201.api.controller.company.request.EmployeeCreateRequest;
import com.e201.api.controller.company.request.ManagerCreateRequest;
import com.e201.api.controller.company.response.DepartmentCreateResponse;
import com.e201.api.controller.company.response.ManagerCreateResponse;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.CompanyInfoRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.domain.repository.company.DepartmentRepository;
import com.e201.domain.repository.company.ManagerRepository;

@SpringBootTest
class ManagerServiceTest {

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	ManagerRepository managerRepository;

	@Autowired
	ManagerService sut;

	Company company;

	CompanyInfo companyInfo;

	Department department;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo("사업자 등록증 번호");
		companyInfoRepository.save(companyInfo);

		company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);

		department = createDepartment(company);
		departmentRepository.save(department);
	}

	@DisplayName("관리자 계정을 저장한다.")
	@Test
	void create_manager_success() {
		// given
		ManagerCreateRequest request = createManagerCreateRequest(department.getId());

		// when
		ManagerCreateResponse actual = sut.create(request);

		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("관리자(엔티티)를 조회한다.")
	@Test
	void find_manager_entity_success() {
		// given
		Manager manager = createManager(department);
		managerRepository.save(manager);

		// when
		Manager actual = sut.findEntity(manager.getId());

		//then
		assertThatManagerMatchExactly(actual);
	}

	@DisplayName("존재하지 않는 관리자(엔티티)를 조회하면 예외가 발생한다.")
	@Test
	void find_manager_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	private ManagerCreateRequest createManagerCreateRequest(UUID departmentId) {
		return ManagerCreateRequest.builder()
			.departmentId(departmentId)
			.code("직원코드")
			.password("12341234")
			.build();
	}

	private Manager createManager(Department department) {
		return Manager.builder()
			.department(department)
			.code("관리자코드")
			.password("12341234")
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

	private void assertThatManagerMatchExactly(Manager manager) {
		assertThat(manager)
			.extracting("code", "password")
			.containsExactly("관리자코드", "12341234");
	}
}