package com.e201.api.controller.payment;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.e201.api.controller.payment.response.EmployeePaymentResponse;
import com.e201.api.controller.payment.response.EmployeeTotalPaymentResponse;
import com.e201.api.controller.payment.response.PaymentFindResponse;
import com.e201.api.service.payment.PaymentService;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.store.Store;
import com.e201.domain.entity.store.StoreInfo;
import com.e201.global.security.auth.constant.AuthConstant;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(PaymentController.class)
class PaymentControllerTest extends AbstractRestDocsTest {

	@MockBean
	PaymentService paymentService;

	@DisplayName("직원 장부 목록을 조회한다.")
	@Test
	void find_employee_payment() throws Exception {
		// given
		UUID managerId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(managerId, RoleType.MANAGER);

		UUID departmentId = UUID.randomUUID();
		LocalDateTime startDate = LocalDateTime.of(2024, 10, 1, 0, 0);
		LocalDateTime endDate = LocalDateTime.of(2024, 10, 31, 23, 59);

		var response1 = createEmployeeTotalPaymentResponse(departmentId, "직원1 이름", 100000L, 56000L);
		var response2 = createEmployeeTotalPaymentResponse(departmentId, "직원2 이름", 200000L, 116000L);
		var responses = List.of(response1, response2);
		var responsePage = new PageImpl<>(responses, PageRequest.of(0, 10), 10);
		String responseJson = objectMapper.writeValueAsString(responsePage);

		doReturn(responsePage).when(paymentService).findEmployeeTotalPayments(any(), any(), any());

		// expected
		mockMvc.perform(get("/payments/companies/employees")
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
				.param("departmentId", departmentId.toString())
				.param("startDate", startDate.toString())
				.param("endDate", endDate.toString())
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("직원 장부 상세 내역을 조회한다.")
	@Test
	void find_employee_payment_detail() throws Exception {
		// given
		UUID managerId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(managerId, RoleType.MANAGER);

		UUID departmentId = UUID.randomUUID();
		UUID employeeId = UUID.randomUUID();
		LocalDateTime startDate = LocalDateTime.of(2024, 10, 1, 0, 0);
		LocalDateTime endDate = LocalDateTime.of(2024, 10, 31, 23, 59);

		var paymentPage = createPaymentResponsePage();
		var response = createEmployeePaymentResponse(employeeId, departmentId, paymentPage);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(paymentService).findEmployeePayments(any(), any(), any());

		// expected
		mockMvc.perform(get("/payments/companies/employees/{id}", employeeId)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
				.param("startDate", startDate.toString())
				.param("endDate", endDate.toString())
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	private EmployeeTotalPaymentResponse createEmployeeTotalPaymentResponse(UUID departmentId,
		String employeeName, Long supportAmount, Long spentAmount) {
		return EmployeeTotalPaymentResponse.builder()
			.employeeId(UUID.randomUUID())
			.employeeName(employeeName)
			.departmentId(departmentId)
			.departmentName("부서 이름")
			.supportAmount(supportAmount)
			.spentAmount(spentAmount)
			.build();
	}

	private EmployeePaymentResponse createEmployeePaymentResponse(UUID employeeId, UUID departmentId,
		Page<PaymentFindResponse> paymentPage) {
		return EmployeePaymentResponse.builder()
			.employeeId(employeeId)
			.employeeName("직원 이름")
			.employeeCode("직원 코드")
			.departmentId(departmentId)
			.departmentName("부서 이름")
			.payments(paymentPage)
			.build();
	}

	private Page<PaymentFindResponse> createPaymentResponsePage() {
		UUID storeId1 = UUID.randomUUID();
		LocalDateTime paymentDate1 = LocalDateTime.of(2024, 10, 1, 12, 11);
		PaymentFindResponse response1 = createPaymentFindResponse(storeId1, "식당 이름1", 12000L, paymentDate1);

		UUID storeId2 = UUID.randomUUID();
		LocalDateTime paymentDate2 = LocalDateTime.of(2024, 10, 10, 12, 16);
		PaymentFindResponse response2 = createPaymentFindResponse(storeId2, "식당 이름2", 15000L, paymentDate2);

		List<PaymentFindResponse> content = List.of(response1, response2);
		return new PageImpl<>(content, PageRequest.of(0, 10), 10L);
	}

	private PaymentFindResponse createPaymentFindResponse(UUID storeId, String storeName, Long spentAmount,
		LocalDateTime paymentDate) {
		return PaymentFindResponse.builder()
			.id(UUID.randomUUID())
			.storeId(storeId)
			.storeName(storeName)
			.spentAmount(spentAmount)
			.paymentDate(paymentDate)
			.build();
	}

	private Employee createEmployee(Department department) {
		return Employee.builder()
			.department(department)
			.code("직원코드")
			.password("12341234")
			.name("직원이름")
			.supportAmount(100000L)
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