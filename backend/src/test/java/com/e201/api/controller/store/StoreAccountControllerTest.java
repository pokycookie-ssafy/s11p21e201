package com.e201.api.controller.store;

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

import com.e201.api.controller.store.request.StoreAccountCreateRequest;
import com.e201.api.controller.store.response.StoreAccountCreateResponse;
import com.e201.api.service.store.StoreAccountService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(StoreAccountController.class)
public class StoreAccountControllerTest extends AbstractRestDocsTest {
	@MockBean
	private StoreAccountService storeAccountService;

	@DisplayName("계좌를 등록한다.")
	@Test
	void create_storeAccount_success() throws Exception{
		//given
		UUID storeAccountId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();
		StoreAccountCreateRequest request = createStoreAccountRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		StoreAccountCreateResponse response = new StoreAccountCreateResponse(storeAccountId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(storeAccountService).create(any(),any(),any(StoreAccountCreateRequest.class));

		// expected
		mockMvc.perform(post("/stores/account")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private StoreAccountCreateRequest createStoreAccountRequest(){
		return StoreAccountCreateRequest.builder()
			.bankName("은행이름")
			.bankCode("은행코드")
			.accountNumber("계좌번호")
			.build();
	}
}
