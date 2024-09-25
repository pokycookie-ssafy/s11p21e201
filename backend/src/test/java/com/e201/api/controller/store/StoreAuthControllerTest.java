package com.e201.api.controller.store;

import static com.e201.global.security.auth.constant.RoleType.*;
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
import org.springframework.mock.web.MockHttpSession;

import com.e201.api.controller.store.request.StoreAuthRequest;
import com.e201.api.service.store.StoreService;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@WebMvcTest(StoreAuthController.class)
public class StoreAuthControllerTest  extends AbstractRestDocsTest {

	@MockBean
	StoreService storeService;
	@MockBean
	private HttpServletRequest httpRequest;

	@MockBean
	private HttpSession session;

	@DisplayName("식당 계정으로 로그인한다.")
	@Test
	void company_auth_success() throws Exception {
		// given
		UUID companyId = UUID.randomUUID();
		StoreAuthRequest request = createStoreAuthRequest("store@test.com", "12341234");
		String requestJson = objectMapper.writeValueAsString(request);
		AuthInfo response = new AuthInfo(companyId, COMPANY);

		doReturn(response).when(storeService).checkPassword(request);

		// when //then
		mockMvc.perform(post("/stores/auth")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated());
	}

	@DisplayName("식당 계정을 로그아웃한다.")
	@Test
	void company_logout_success() throws Exception {
		//given
		when(httpRequest.getSession()).thenReturn(session);

		mockMvc.perform(delete("/stores")
				.requestAttr("httpRequest", httpRequest)) // httpRequest를 요청 속성으로 전달
			.andExpect(request().sessionAttributeDoesNotExist())
			.andExpect(status().isNoContent());

	}

	private StoreAuthRequest createStoreAuthRequest(String email, String password) {
		return StoreAuthRequest.builder()
			.email(email)
			.password(password)
			.build();
	}


}
