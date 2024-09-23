package com.e201.domain.repository.company;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.api.service.company.EmployeeService;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;

@SpringBootTest
class EmployeeRepositoryTest {

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	EmployeeRepository sut;

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

	@DisplayName("코드로 직원 계정을 조회한다.")
	@Test
	void find_by_code_success() {
		// given
		Employee employee = createEmployee(department);
		sut.save(employee);

		// when
		Employee actual = sut.findByCode(employee.getCode()).get();

		//then
		assertThat(actual).extracting("code", "password").containsExactly(employee.getCode(), employee.getPassword());
	}

	@DisplayName("존재하지 않는 코드로 직원 계정을 조회하면, 비어있는 값이 조회된다.")
	@Test
	void find_by_code_fail() {
		// given // when
		Optional<Employee> actual = sut.findByCode("존재하지 않은 코드");

		//then
		assertThat(actual).isEmpty();
	}

	private Employee createEmployee(Department department) {
		return Employee.builder()
			.department(department)
			.code("직원코드")
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
}