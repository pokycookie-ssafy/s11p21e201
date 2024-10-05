package com.e201.api.controller.contract;

import static com.e201.global.security.auth.constant.AuthConstant.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;

import com.e201.api.controller.contract.response.InvoiceCreateResponse;
import com.e201.api.controller.contract.response.InvoiceDownloadResponse;
import com.e201.api.service.contract.InvoiceService;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(InvoiceController.class)
public class InvoiceControllerTest extends AbstractRestDocsTest {

	@MockBean
	InvoiceService invoiceService;

	@DisplayName("세금계산서 파일을 업로드 한다.")
	@Test
	void upload_invoice_success() throws Exception {
		// given
		String contractId = UUID.randomUUID().toString();

		UUID settlementId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(storeId, RoleType.STORE);

		InvoiceCreateResponse response = new InvoiceCreateResponse(settlementId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(invoiceService).create(any(), any());

		MockMultipartFile image = new MockMultipartFile(
			"image",
			"image.png",
			IMAGE_PNG_VALUE,
			"image.png".getBytes()
		);
		// expect
		mockMvc.perform(multipart("/settlements/{settlement_id}/invoice",settlementId)
				.file(image)
				.contentType(MULTIPART_FORM_DATA)
				.sessionAttr(AUTH_INFO.name(), authInfo)
			).andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("세금계산서 파일을 다운로드 한다.")
	@Test
	void download_invoice_success() throws Exception {
		//given
		String invoiceId = UUID.randomUUID().toString();
		UUID storeId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(storeId, RoleType.STORE);

		MockMultipartFile image = new MockMultipartFile(
			"image",
			"image.png",
			IMAGE_PNG_VALUE,
			"image.png".getBytes()
		);

		InvoiceDownloadResponse response = new InvoiceDownloadResponse(image.getResource(), IMAGE_PNG_VALUE,
			"image.png");
		doReturn(response).when(invoiceService).download(invoiceId);

		//expect
		mockMvc.perform(get("/invoice/download/" + invoiceId)
				.sessionAttr(AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk());
	}

	@DisplayName("세금계산서를 삭제한다.")
	@Test
	void delete_invoice_success() throws Exception {
		//given
		String invoiceId = UUID.randomUUID().toString();
		UUID storeId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(storeId, RoleType.STORE);

		//expect
		mockMvc.perform(delete("/invoices/" + invoiceId)
				.sessionAttr(AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isNoContent());
	}
}
