package com.e201.api.controller.contract;

import static com.e201.global.security.auth.constant.AuthConstant.*;
import static com.e201.global.security.auth.constant.RoleType.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.api.service.contract.ContractService;
import com.e201.domain.entity.contract.ContractRespondType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(ContractController.class)
public class ContractControllerTest extends AbstractRestDocsTest {

	@MockBean
	ContractService contractService;

	@DisplayName("계약을 신청한다.")
	@Test
	void create_contract_success() throws Exception {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		UUID contractId = UUID.randomUUID();

		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		String requestJson = objectMapper.writeValueAsString(request);

		AuthInfo authInfo = new AuthInfo(UUID.fromString(companyId), COMPANY);

		ContractCreateResponse response = new ContractCreateResponse(contractId);
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(contractService).create(any(), any(ContractCreateRequest.class));

		//expect
		mockMvc.perform(post("/contracts")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
				.sessionAttr(AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("계약 요청을 수락한다.")
	@Test
	void respond_contract_success() throws Exception {
		//given
		UUID companyId = UUID.randomUUID();
		String contractId = UUID.randomUUID().toString();

		AuthInfo authInfo = new AuthInfo(companyId, COMPANY);

		ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.APPROVE);
		String requestJson = objectMapper.writeValueAsString(request);

		ContractRespondResponse response = new ContractRespondResponse(UUID.fromString(contractId));
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(contractService).respond(any(), any(ContractRespondCondition.class));
		//expect
		mockMvc.perform(post("/contracts/respond")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
				.sessionAttr(AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("계약을 해지한다")
	@Test
	void delete_contract_success() throws Exception {
		//given
		String contractId = UUID.randomUUID().toString();
		UUID companyId = UUID.randomUUID();
		AuthInfo authInfo = new AuthInfo(companyId, COMPANY);

		//expect
		mockMvc.perform(delete("/contracts/" + contractId)
				.sessionAttr(AUTH_INFO.name(), authInfo))
			.andExpect(status().isNoContent());
	}

	private ContractRespondCondition createContractRespondCondition(String contractId,
		ContractRespondType respondResult) {
		return ContractRespondCondition.builder()
			.contractId(contractId)
			.respondResult(respondResult)
			.build();
	}

	private ContractCreateRequest createContractCreateRequest(String companyId, String storeId) {
		return ContractCreateRequest.builder()
			.companyId(companyId)
			.storeId(storeId)
			.settlementDay(10)
			.build();
	}
}
