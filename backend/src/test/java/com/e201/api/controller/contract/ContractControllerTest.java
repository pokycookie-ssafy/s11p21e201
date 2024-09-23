package com.e201.api.controller.contract;

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
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
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

		ContractCreateResponse response = new ContractCreateResponse(contractId);
		String responseJson = objectMapper.writeValueAsString(response);

		//TODO: Contract SenderType을 Cookie에서 가져올경우 수정해야함 - kkj
		doReturn(response).when(contractService).create(eq("STORE"), any(ContractCreateRequest.class));

		//expect
		mockMvc.perform(post("/contracts")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

<<<<<<< HEAD
	private ContractCreateRequest createContractCreateRequest(String companyId, String storeId) {
=======
	@DisplayName("계약 요청을 수락한다.")
	@Test
	void respond_contract_success() throws Exception{
		//given
		String contractId = UUID.randomUUID().toString();

		ContractRespondCondition request = createContractRespondCondition(contractId, "APPROVE");
		String requestJson = objectMapper.writeValueAsString(request);

		ContractRespondResponse response = new ContractRespondResponse(UUID.fromString(contractId));
		String responseJson = objectMapper.writeValueAsString(response);

		doReturn(response).when(contractService).respond(any(ContractRespondCondition.class));
		//expect
		mockMvc.perform(post("/contracts/respond")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
			)
			.andExpect(status().isOk())
			.andExpect(content().json(responseJson));
	}

	@DisplayName("계약을 해지한다")
	@Test
	void delete_contract_success() throws Exception{
		//given
		String contractId = UUID.randomUUID().toString();

		//expect
		mockMvc.perform(delete("/contracts/"+contractId))
			// .param("contractId", contractId))
			.andExpect(status().isNoContent());
	}

	private ContractRespondCondition createContractRespondCondition(String contractId, String respondResult) {
		return ContractRespondCondition.builder()
			.contractId(contractId)
			.respondResult(respondResult)
			.build();
	}

	private ContractCreateRequest createContractCreateRequest (String companyId, String storeId) {
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
		return ContractCreateRequest.builder()
			.companyId(companyId)
			.storeId(storeId)
			.sattlementDate(10)
			.build();
	}
}
