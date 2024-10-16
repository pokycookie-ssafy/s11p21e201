package com.e201.api.controller.company;

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

import com.e201.api.controller.company.request.manager.ManagerCreateRequest;
import com.e201.api.controller.company.response.manager.ManagerCreateResponse;
import com.e201.api.controller.company.response.manager.ManagerFindResponse;
import com.e201.api.service.company.ManagerService;
import com.e201.global.security.auth.constant.AuthConstant;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
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

	@DisplayName("관리자 목록을 조회한다.")
	@Test
	void find_managers_success() throws Exception {
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), RoleType.COMPANY);

		ManagerFindResponse response1 = createManagerFindResponse("관리자 코드1", "부서 이름1");
		ManagerFindResponse response2 = createManagerFindResponse("관리자 코드2", "부서 이름2");
		ManagerFindResponse response3 = createManagerFindResponse("관리자 코드3", "부서 이름3");
		var response = List.of(response1, response2, response3);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(managerService).findAllByCompanyId(any());

		// expected
		mockMvc.perform(get("/companies/managers")
				.contentType(APPLICATION_JSON)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	private ManagerFindResponse createManagerFindResponse(String code, String departmentName) {
		return ManagerFindResponse.builder()
			.id(UUID.randomUUID())
			.code(code)
			.departmentId(UUID.randomUUID())
			.departmentName(departmentName)
			.createdAt(LocalDateTime.of(2024, 10, 2, 11, 0))
			.build();
	}

	private ManagerCreateRequest createManagerCreateRequest(UUID departmentId) {
		return ManagerCreateRequest.builder()
			.departmentId(departmentId)
			.code("직원코드")
			.password("12341234")
			.build();
	}
}