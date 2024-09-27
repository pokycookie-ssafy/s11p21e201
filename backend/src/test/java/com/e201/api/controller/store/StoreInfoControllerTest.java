package com.e201.api.controller.store;

import static org.mockito.ArgumentMatchers.*;
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

import com.e201.api.controller.store.request.StoreInfoCreateRequest;
import com.e201.api.controller.store.request.StoreInfoUpdateRequest;
import com.e201.api.controller.store.response.StoreInfoCreateResponse;
import com.e201.api.controller.store.response.StoreInfoFindResponse;
import com.e201.api.controller.store.response.StoreInfoUpdateResponse;
import com.e201.api.service.store.StoreInfoService;
import com.e201.api.service.store.StoreService;
import com.e201.global.security.auth.constant.AuthConstant;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(StoreInfoController.class)
public class StoreInfoControllerTest extends AbstractRestDocsTest {
	@MockBean
	StoreInfoService storeInfoService;
	@MockBean
	StoreService storeService;

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

	@DisplayName("식당 정보를 단건 조회 한다.")
	@Test
	void find_store_success() throws Exception {
		UUID storeId = UUID.randomUUID();
		StoreInfoFindResponse response = createStoreFindResponse(storeId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(storeInfoService).findOne(any());
		// expected
		mockMvc.perform(get("/stores/"+storeId)
				.contentType(APPLICATION_JSON)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));

	}

	@DisplayName("식당 정보를 수정한다.")
	@Test
	void update_storeInfo_success() throws Exception {

		// given
		UUID storeInfoId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(storeId, RoleType.STORE);
		StoreInfoUpdateRequest request = createStoreInfoUpdateRequest();
		String requestJson = objectMapper.writeValueAsString(request);
		StoreInfoUpdateResponse response = new StoreInfoUpdateResponse(storeInfoId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(storeInfoService).update(any(), any(),any(StoreInfoUpdateRequest.class));

		// expected
		mockMvc.perform(put("/stores")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
				.sessionAttr(AuthConstant.AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
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
	private StoreInfoFindResponse createStoreFindResponse(UUID id) {
		return StoreInfoFindResponse.builder()
			.id(id)
			.name("사업명")
			.category("분류")
			.address("사업체주소")
			.ownerName("대표이름")
			.phone("연락처")
			.licenseNo("사업자등록증번호")
			.build();
	}

	private StoreInfoUpdateRequest createStoreInfoUpdateRequest(){
		return StoreInfoUpdateRequest.builder()
			.name("수정된 사업장 이름")
			.phone("수정된 사업장 연락처")
			.address("수정된 사업장 주소")
			.category("수정된 사업 유형")
			.ownerName("수정된 사업자 대표 이름")
			.licenseNo("수정된 사업자 등록증 번호")
			.build();
	}
}
