package com.e201.api.controller.company;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.company.request.companyinfo.CompanyInfoCreateRequest;
import com.e201.api.controller.company.response.companyinfo.CompanyInfoCreateResponse;
import com.e201.api.service.company.CompanyInfoService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(CompanyInfoController.class)
class CompanyInfoControllerTest extends AbstractRestDocsTest {

	@MockBean
	CompanyInfoService companyInfoService;

	@DisplayName("기업 정보를 등록한다.")
	@Test
	void create_companyInfo_success() throws Exception {
		// given
		UUID companyInfoId = UUID.randomUUID();
		CompanyInfoCreateRequest request = createCompanyInfoCreateRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		CompanyInfoCreateResponse response = new CompanyInfoCreateResponse(companyInfoId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(companyInfoService).create(any(CompanyInfoCreateRequest.class));

		// expected
		mockMvc.perform(post("/companies/info")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private CompanyInfoCreateRequest createCompanyInfoCreateRequest() {
		return CompanyInfoCreateRequest.builder()
			.businessName("사업장 이름")
			.phone("사업장 연락처")
			.address("사업장 주소")
			.businessType("사업 유형")
			.representativeName("사업자 대표 이름")
			.registerNumber("사업자 등록증 번호")
			.build();
	}
}