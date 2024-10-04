package com.e201.api.controller.company;

import static com.e201.global.security.auth.constant.AuthConstant.*;
import static com.e201.global.security.auth.constant.RoleType.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.controller.company.response.employee.EmployeeFindResponse;
import com.e201.api.controller.company.response.employee.EmployeeUsageResponse;
import com.e201.api.controller.payment.response.PaymentAndMenusFindResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.payment.PaymentService;
import com.e201.domain.entity.store.Menu;
import com.e201.global.security.auth.constant.AuthConstant;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest extends AbstractRestDocsTest {

	@MockBean
	EmployeeService employeeService;
	@MockBean
	private PaymentService paymentService;

	@DisplayName("직원 계정을 생성한다.")
	@Test
	void create_companyInfo_success() throws Exception {
		// given
		UUID managerId = UUID.randomUUID();
		UUID employeeId = UUID.randomUUID();
		EmployeeCreateRequest request = createEmployeeCreateRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		EmployeeCreateResponse response = new EmployeeCreateResponse(employeeId);
		String responseJson = objectMapper.writeValueAsString(response);
		AuthInfo authInfo = new AuthInfo(managerId, MANAGER);

		doReturn(response).when(employeeService).create(any(EmployeeCreateRequest.class), any());

		// expected
		mockMvc.perform(post("/companies/employees")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AUTH_INFO.name(), authInfo)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("직원 목록을 조회한다.")
	@Test
	void find_employees_success() throws Exception {
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), MANAGER);

		UUID departmentId = UUID.randomUUID();
		var response1 = createEmployeeFindResponse("직원 코드1", "직원 이름1", departmentId, 100000L);
		var response2 = createEmployeeFindResponse("직원 코드2", "직원 이름2", departmentId, 100000L);
		var response3 = createEmployeeFindResponse("직원 코드3", "직원 이름3", departmentId, 100000L);
		var response = List.of(response1, response2, response3);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(employeeService).findAll(any());

		// expected
		mockMvc.perform(get("/companies/employees")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("해당 기간내 직원의 사용량을 조회한다.")
	@Test
	void find_usage_success() throws Exception {
		// given
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), EMPLOYEE);
		EmployeeUsageResponse response = EmployeeUsageResponse.builder()
			.supportAmount(100000L)
			.usage(78000L)
			.build();
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(paymentService).findUsage(any(), any());

		// when //then
		mockMvc.perform(MockMvcRequestBuilders.get("/companies/employees/usages")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
				.param("startDate", LocalDateTime.now().minusMonths(1).toString())
				.param("endDate", LocalDateTime.now().toString())
			)
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().json(responseJson));
	}

	@DisplayName("해당 기간내 직원의 상세 사용 내역을 조회한다.")
	@Test
	void find_payment_details_success() throws Exception {
		// given
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), EMPLOYEE);
		Menu menu1 = createMenu("메뉴1", 10000);
		Menu menu2 = createMenu("메뉴2", 11000);
		PaymentAndMenusFindResponse detailResponse1 = createPaymentDetail("식당1", 21000L);
		detailResponse1.addMenus(menu1);
		detailResponse1.addMenus(menu2);

		Menu menu3 = createMenu("메뉴3", 12000);
		Menu menu4 = createMenu("메뉴4", 13000);
		PaymentAndMenusFindResponse detailResponse2 = createPaymentDetail("식당2", 25000L);
		detailResponse2.addMenus(menu3);
		detailResponse2.addMenus(menu4);

		List<PaymentAndMenusFindResponse> detailResponses = List.of(detailResponse1, detailResponse2);

		String responseJson = objectMapper.writeValueAsString(detailResponses);

		doReturn(detailResponses).when(paymentService).findUserPaymentDetails(any(), any());

		// when //then
		mockMvc.perform(MockMvcRequestBuilders.get("/companies/employees/usages/detail")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
				.param("startDate", LocalDateTime.now().minusMonths(1).toString())
				.param("endDate", LocalDateTime.now().toString())
			)
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().json(responseJson));
	}

	private PaymentAndMenusFindResponse createPaymentDetail(String storeName, long amount) {
		return PaymentAndMenusFindResponse.builder()
			.id(UUID.randomUUID())
			.storeId(UUID.randomUUID())
			.storeName(storeName)
			.amount(amount)
			.paymentDate(LocalDateTime.now())
			.build();
	}

	private Menu createMenu(String name, int price) {
		return Menu.builder()
			.id(UUID.randomUUID())
			.name(name)
			.price(price)
			.category("카테고리")
			.build();
	}

	private static EmployeeFindResponse createEmployeeFindResponse(String code, String name, UUID departmentId,
		Long supportAmount) {
		return EmployeeFindResponse.builder()
			.id(UUID.randomUUID())
			.employeeCode(code)
			.employeeName(name)
			.departmentId(departmentId)
			.departmentName("부서 이름")
			.supportAmount(supportAmount)
			.createdAt(LocalDateTime.of(2024, 10, 2, 11, 0))
			.build();
	}

	private EmployeeCreateRequest createEmployeeCreateRequest() {
		return EmployeeCreateRequest.builder()
			.code("직원코드")
			.password("12341234")
			.name("직원이름")
			.supportAmount(100000L)
			.build();
	}
}