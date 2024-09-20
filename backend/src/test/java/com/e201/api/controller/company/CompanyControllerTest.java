package com.e201.api.controller.company;

import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.company.request.company.CompanyCreateRequest;
import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.manager.ManagerAuthRequest;
import com.e201.api.controller.company.response.company.CompanyCreateResponse;
import com.e201.api.service.company.CompanyService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(CompanyController.class)
class CompanyControllerTest extends AbstractRestDocsTest {

	@MockBean
	CompanyService companyService;

	@DisplayName("기업이 회원가입을 한다.")
	@Test
	void create_company_success() throws Exception {
		// given
		UUID companyInfoId = UUID.randomUUID();
		UUID companyId = UUID.randomUUID();
		CompanyCreateRequest request = createCompanyCreateRequest(companyInfoId);
		String requestJson = objectMapper.writeValueAsString(request);
		CompanyCreateResponse response = new CompanyCreateResponse(companyId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(companyService).create(any(CompanyCreateRequest.class));

		// expected
		mockMvc.perform(post("/companies")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private CompanyCreateRequest createCompanyCreateRequest(UUID companyInfoId) {
		return CompanyCreateRequest.builder()
			.companyInfoId(companyInfoId)
			.email("company@test.com")
			.password("12341234")
			.build();
	}
}