package com.e201.api.controller.company;

import static org.junit.jupiter.api.Assertions.*;
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

import com.e201.api.controller.company.request.DepartmentCreateRequest;
import com.e201.api.controller.company.request.EmployeeCreateRequest;
import com.e201.api.controller.company.response.DepartmentCreateResponse;
import com.e201.api.controller.company.response.EmployeeCreateResponse;
import com.e201.api.service.company.EmployeeService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest extends AbstractRestDocsTest {

	@MockBean
	EmployeeService employeeService;

	@DisplayName("직원 계정을 생성한다.")
	@Test
	void create_companyInfo_success() throws Exception {
		// given
		UUID departmentId = UUID.randomUUID();
		UUID employeeId = UUID.randomUUID();
		EmployeeCreateRequest request = createEmployeeCreateRequest(departmentId);
		String requestJson = objectMapper.writeValueAsString(request);
		EmployeeCreateResponse response = new EmployeeCreateResponse(employeeId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(employeeService).create(any(EmployeeCreateRequest.class));

		// expected
		mockMvc.perform(post("/companies/employees")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private EmployeeCreateRequest createEmployeeCreateRequest(UUID departmentId) {
		return EmployeeCreateRequest.builder()
			.departmentId(departmentId)
			.code("직원코드")
			.password("12341234")
			.build();
	}
}