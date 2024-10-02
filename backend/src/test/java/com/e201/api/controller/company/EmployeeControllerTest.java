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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.controller.company.response.employee.EmployeeFindResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.global.security.auth.constant.AuthConstant;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest extends AbstractRestDocsTest {

	@MockBean
	EmployeeService employeeService;

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
		var response1 = createEmployeeFindResponse("직원 코드1", "직원 이름1", departmentId, 100000);
		var response2 = createEmployeeFindResponse("직원 코드2", "직원 이름2", departmentId, 100000);
		var response3 = createEmployeeFindResponse("직원 코드3", "직원 이름3", departmentId, 100000);
		var content = List.of(response1, response2, response3);
		var response = new PageImpl<>(content, PageRequest.of(0, 10), 10);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(employeeService).findPage(any(), any());

		// expected
		mockMvc.perform(get("/companies/employees")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	private static EmployeeFindResponse createEmployeeFindResponse(String code, String name, UUID departmentId,
		int supportAmount) {
		return EmployeeFindResponse.builder()
			.id(UUID.randomUUID())
			.code(code)
			.name(name)
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
			.supportAmount(100000)
			.build();
	}
}