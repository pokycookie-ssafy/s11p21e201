package com.e201.api.controller.company;

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

import com.e201.api.controller.company.request.manager.ManagerCreateRequest;
import com.e201.api.controller.company.response.manager.ManagerCreateResponse;
import com.e201.api.service.company.ManagerService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(ManagerController.class)
class ManagerControllerTest extends AbstractRestDocsTest {

	@MockBean
	ManagerService managerService;

	@DisplayName("직원 계정을 생성한다.")
	@Test
	void create_manager_success() throws Exception {
		// given
		UUID departmentId = UUID.randomUUID();
		UUID managerId = UUID.randomUUID();
		ManagerCreateRequest request = createManagerCreateRequest(departmentId);
		String requestJson = objectMapper.writeValueAsString(request);
		ManagerCreateResponse response = new ManagerCreateResponse(managerId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(managerService).create(any(ManagerCreateRequest.class));

		// expected
		mockMvc.perform(post("/companies/managers")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private ManagerCreateRequest createManagerCreateRequest(UUID departmentId) {
		return ManagerCreateRequest.builder()
			.departmentId(departmentId)
			.code("직원코드")
			.password("12341234")
			.build();
	}
}