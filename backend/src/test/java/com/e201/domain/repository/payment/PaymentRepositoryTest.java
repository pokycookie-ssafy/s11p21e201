package com.e201.domain.repository.payment;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.payment.Payment;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.domain.repository.company.CompanyInfoRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.domain.repository.company.DepartmentRepository;
import com.e201.domain.repository.company.EmployeeRepository;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.store.StoreInfoRepository;
import com.e201.domain.repository.store.StoreRepository;

@SpringBootTest
@JtaTransactional
class PaymentRepositoryTest {

	@Autowired
	private PaymentRepository sut;

	@Autowired
	CompanyInfoRepository companyInfoRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	StoreInfoRepository storeInfoRepository;

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	ContractRepository contractRepository;

	Company company;

	CompanyInfo companyInfo;

	Department department1;

	Department department2;

	StoreInfo storeInfo;

	Store store;

	Contract contract;

	@BeforeEach
	void setUp() {
		companyInfo = createCompanyInfo("사업자 등록증 번호");
		companyInfoRepository.save(companyInfo);

		company = createCompany("company@test.com", "12341234", companyInfo);
		companyRepository.save(company);

		department1 = createDepartment(company, "1");
		departmentRepository.save(department1);

		department2 = createDepartment(company, "2");
		departmentRepository.save(department2);

		storeInfo = createStoreInfo("사업자 등록증 번호");
		storeInfoRepository.save(storeInfo);

		store = createStore(storeInfo, "store@test.com", "12341234");
		storeRepository.save(store);

		contract = createContract(company.getId(), store.getId(), ContractStatus.COMPLETE, 15);
		contractRepository.save(contract);
	}

	@DisplayName("직원 장부 목록을 조회한다.")
	@Test
	void find_employee_payment() {
		// given
		Employee employee1 = createEmployee(department1);
		employeeRepository.save(employee1);
		Employee employee2 = createEmployee(department2);
		employeeRepository.save(employee2);

		LocalDateTime paymentDate = LocalDateTime.now();

		Payment payment1 = Payment.builder()
			.employeeId(employee1.getId())
			.contractId(contract.getId())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.totalAmount(15000L)
			.paymentDate(paymentDate)
			.build();

		Payment payment2 = Payment.builder()
			.employeeId(employee1.getId())
			.contractId(contract.getId())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.totalAmount(25000L)
			.paymentDate(paymentDate)
			.build();

		Payment payment3 = Payment.builder()
			.employeeId(employee2.getId())
			.contractId(contract.getId())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.totalAmount(13000L)
			.paymentDate(paymentDate)
			.build();

		sut.saveAll(List.of(payment1, payment2, payment3));

		LocalDateTime startDate = LocalDateTime.now().minusDays(1);
		LocalDateTime endDate = LocalDateTime.now().plusDays(1);

		// when
		Page<EmployeeTotalPaymentResponse> actual = sut.findEmployeeTotalPayments(company.getId(), null,
			startDate, endDate, PageRequest.of(0, 10));

		//then
		assertThat(actual.getContent().size()).isEqualTo(2);
	}

	@DisplayName("직원 장부 상세 내역을 조회한다.")
	@Test
	void find_employee_payment_detail() {
		// given
		Employee employee1 = createEmployee(department1);
		employeeRepository.save(employee1);
		Employee employee2 = createEmployee(department2);
		employeeRepository.save(employee2);

		LocalDateTime paymentDate = LocalDateTime.now();

		Payment payment1 = Payment.builder()
			.employeeId(employee1.getId())
			.contractId(contract.getId())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.totalAmount(15000L)
			.paymentDate(paymentDate)
			.build();

		Payment payment2 = Payment.builder()
			.employeeId(employee1.getId())
			.contractId(contract.getId())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.totalAmount(25000L)
			.paymentDate(paymentDate)
			.build();

		Payment payment3 = Payment.builder()
			.employeeId(employee1.getId())
			.contractId(contract.getId())
			.storeId(store.getId())
			.storeName(store.getStoreInfo().getName())
			.totalAmount(13000L)
			.paymentDate(paymentDate)
			.build();

		sut.saveAll(List.of(payment1, payment2, payment3));

		LocalDateTime startDate = LocalDateTime.now().minusDays(1);
		LocalDateTime endDate = LocalDateTime.now().plusDays(1);

		// when
		EmployeePaymentResponse actual = sut.findEmployeePayments(employee1.getId(),
			startDate, endDate, PageRequest.of(0, 10));

		//then
		assertThat(actual.getPayments().getContent().size()).isEqualTo(3);
	}

	private Employee createEmployee(Department department) {
		return Employee.builder()
			.department(department)
			.code("직원코드")
			.password("12341234")
			.name("직원이름")
			.supportAmount(100000)
			.build();
	}

	private Department createDepartment(Company company, String code) {
		return Department.builder()
			.company(company)
			.code(code)
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

	private StoreInfo createStoreInfo(String registerNumber) {
		return StoreInfo.builder()
			.registerNumber(registerNumber)
			.name("식당이름")
			.phone("식당 연락처")
			.businessType("업종")
			.businessAddress("식당 주소")
			.representativeName("대표자이름")
			.build();
	}

	private Store createStore(StoreInfo storeInfo, String email, String password) {
		return Store.builder()
			.storeInfo(storeInfo)
			.email(email)
			.password(password)
			.build();
	}

	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDay) {
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.status(contractStatus)
			.settlementDay(settlementDay)
			.build();
	}
}