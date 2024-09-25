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

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.api.service.store.StoreInfoService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(StoreInfoController.class)
public class StoreInfoControllerTest extends AbstractRestDocsTest {
	@MockBean
	StoreInfoService storeInfoService;

	@DisplayName("식당 정보를 등록한다.")
	@Test
	void create_storeInfo_success() throws Exception {
		// given
		UUID storeInfoId = UUID.randomUUID();
		StoreInfoCreateRequest request = createStoreInfoRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		StoreInfoCreateResponse response = new StoreInfoCreateResponse(storeInfoId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(storeInfoService).create(any(StoreInfoCreateRequest.class));

		// expected
		mockMvc.perform(post("/stores/info")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private StoreInfoCreateRequest createStoreInfoRequest() {
		return StoreInfoCreateRequest.builder()
			.registerNumber("식당 등록증 번호")
			.name("식당 이름")
			.phone("식당 연락처")
			.businessAddress("식당 주소")
			.businessType("식당 유형")
			.representativeName("식당 대표 이름")
			.build();
	}
}
