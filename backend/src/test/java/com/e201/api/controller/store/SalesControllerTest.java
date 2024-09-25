package com.e201.api.controller.store;

import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.store.request.SalesCreateRequest;
import com.e201.api.controller.store.response.SalesCreateResponse;
import com.e201.api.service.store.SalesService;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(SalesController.class)
public class SalesControllerTest extends AbstractRestDocsTest {
	@MockBean
	private SalesService salesService;

	@DisplayName("판매기록을 등록한다.")
	@Test
	void create_sales_success() throws Exception {
		//given
		UUID companyId = UUID.randomUUID();
		UUID menuId = UUID.randomUUID();
		UUID salesId = UUID.randomUUID();

		SalesCreateRequest request = createSalesRequest(menuId, companyId);
		String requestJson = objectMapper.writeValueAsString(request);

		SalesCreateResponse response = createResponse(companyId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(salesService).create(any(SalesCreateRequest.class));

		//expected
		mockMvc.perform(post("/stores/sales")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	private SalesCreateRequest createSalesRequest(UUID menuId, UUID companyId) {
		return SalesCreateRequest.builder()
			.menuId(menuId)
			.companyId(companyId)
			.build();
	}

	private SalesCreateResponse createResponse(UUID companyId) {
		return SalesCreateResponse.builder()
			.companyId(companyId)
			.menuName("MenuName")
			.companyName("companyName")
			.paymentId("paymentsId")
			.build();
	}
}
