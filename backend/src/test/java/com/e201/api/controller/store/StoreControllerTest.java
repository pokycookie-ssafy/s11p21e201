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

import com.e201.api.controller.store.request.StoreCreateRequest;
import com.e201.api.controller.store.response.StoreCreateResponse;
import com.e201.api.controller.store.response.StoreInfoFindResponse;
import com.e201.api.service.store.StoreService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(StoreController.class)
public class StoreControllerTest extends AbstractRestDocsTest {
	@MockBean
	StoreService storeService;

	@DisplayName("식당을 등록한다.")
	@Test
	void create_store_success() throws Exception {
		// given
		UUID storeId = UUID.randomUUID();
		UUID storeInfoId = UUID.randomUUID();
		StoreCreateRequest request = createStoreRequest(storeInfoId);
		String requestJson = objectMapper.writeValueAsString(request);
		StoreCreateResponse response = new StoreCreateResponse(storeId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(storeService).create(any(StoreCreateRequest.class));

		// expected
		mockMvc.perform(post("/stores")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private StoreCreateRequest createStoreRequest(UUID id) {
		return StoreCreateRequest.builder()
			.storeInfoId(id)
			.email("이메일")
			.password("비밀번호")
			.build();
	}
}
