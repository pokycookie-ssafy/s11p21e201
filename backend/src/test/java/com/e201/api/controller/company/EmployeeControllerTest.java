package com.e201.api.controller.company;

import static com.e201.global.security.auth.constant.AuthConstant.*;
import static com.e201.global.security.auth.constant.RoleType.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.company.request.employee.EmployeeCreateRequest;
import com.e201.api.controller.company.response.employee.EmployeeCreateResponse;
import com.e201.api.service.company.EmployeeService;
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

	private EmployeeCreateRequest createEmployeeCreateRequest() {
		return EmployeeCreateRequest.builder()
			.code("직원코드")
			.password("12341234")
			.build();
	}
}