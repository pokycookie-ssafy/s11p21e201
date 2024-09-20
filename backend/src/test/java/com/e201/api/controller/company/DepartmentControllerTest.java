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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.company.request.CompanyInfoCreateRequest;
import com.e201.api.controller.company.request.DepartmentCreateRequest;
import com.e201.api.controller.company.response.CompanyInfoCreateResponse;
import com.e201.api.controller.company.response.DepartmentCreateResponse;
import com.e201.api.service.company.DepartmentService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(DepartmentController.class)
class DepartmentControllerTest extends AbstractRestDocsTest {

	@MockBean
	DepartmentService departmentService;

	@DisplayName("부서를 등록한다.")
	@Test
	void create_department_success() throws Exception {
		// given
		UUID companyId = UUID.randomUUID();
		UUID departmentId = UUID.randomUUID();
		DepartmentCreateRequest request = createDepartmentCreateRequest(companyId);
		String requestJson = objectMapper.writeValueAsString(request);
		DepartmentCreateResponse response = new DepartmentCreateResponse(departmentId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(departmentService).create(any(DepartmentCreateRequest.class));

		// expected
		mockMvc.perform(post("/companies/departments")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private DepartmentCreateRequest createDepartmentCreateRequest(UUID companyId) {
		return DepartmentCreateRequest.builder()
			.companyId(companyId)
			.code("부서코드")
			.name("부서이름")
			.build();
	}
}