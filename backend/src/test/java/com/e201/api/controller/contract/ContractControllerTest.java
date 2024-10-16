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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.api.service.contract.ContractService;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
=======
import org.springframework.http.MediaType;
=======
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.api.service.contract.ContractService;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
import com.e201.domain.entity.contract.ContractResponse;
<<<<<<< HEAD
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
import org.springframework.http.MediaType;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.api.service.contract.ContractService;
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
import org.springframework.http.MediaType;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.api.service.contract.ContractService;
<<<<<<< HEAD
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Status;
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
import com.e201.domain.entity.contract.ContractResponse;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
=======
import com.e201.domain.entity.contract.ContractRespondType;
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
import com.e201.global.security.auth.dto.AuthInfo;
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
=======
import com.e201.domain.entity.contract.ContractRespondType;
import com.e201.global.security.auth.dto.AuthInfo;
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
import com.e201.restdocs.AbstractRestDocsTest;

@WebMvcTest(ContractController.class)
public class ContractControllerTest extends AbstractRestDocsTest {

	@MockBean
	ContractService contractService;

	@DisplayName("계약을 신청한다.")
	@Test
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	void create_contract_success() throws Exception {
=======
	void create_contract_success() throws Exception{
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	void create_contract_success() throws Exception{
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	void create_contract_success() throws Exception{
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	void create_contract_success() throws Exception {
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
=======
	void create_contract_success() throws Exception {
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		UUID contractId = UUID.randomUUID();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
=======
		ContractCreateRequest request = createContractCreateRequest(companyId,storeId);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateRequest request = createContractCreateRequest(companyId,storeId);
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateRequest request = createContractCreateRequest(companyId,storeId);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======

		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
=======

		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
		String requestJson = objectMapper.writeValueAsString(request);

		AuthInfo authInfo = new AuthInfo(UUID.fromString(companyId), COMPANY);

		ContractCreateResponse response = new ContractCreateResponse(contractId);
		String responseJson = objectMapper.writeValueAsString(response);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		//TODO: Contract SenderType을 Cookie에서 가져올경우 수정해야함 - kkj
<<<<<<< HEAD
		doReturn(response).when(contractService).create(eq("STORE"), any(ContractCreateRequest.class));
=======
		doReturn(response).when(contractService).create(eq("STORE"),any(ContractCreateRequest.class));
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		doReturn(response).when(contractService).create(any(), any(ContractCreateRequest.class));
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		//TODO: Contract SenderType을 Cookie에서 가져올경우 수정해야함 - kkj
		doReturn(response).when(contractService).create(eq("STORE"),any(ContractCreateRequest.class));
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		//TODO: Contract SenderType을 Cookie에서 가져올경우 수정해야함 - kkj
		doReturn(response).when(contractService).create(eq("STORE"),any(ContractCreateRequest.class));
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		doReturn(response).when(contractService).create(any(), any(ContractCreateRequest.class));
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		doReturn(response).when(contractService).create(any(), any(ContractCreateRequest.class));
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85

		//expect
		mockMvc.perform(post("/contracts")
				.contentType(APPLICATION_JSON)
				.content(requestJson)
				.sessionAttr(AUTH_INFO.name(), authInfo)
			)
			.andExpect(status().isCreated())
			.andExpect(content().json(responseJson));
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	private ContractCreateRequest createContractCreateRequest(String companyId, String storeId) {
=======
=======
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
	@DisplayName("계약 요청을 수락한다.")
	@Test
	void respond_contract_success() throws Exception {
		//given
		UUID companyId = UUID.randomUUID();
		String contractId = UUID.randomUUID().toString();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
		AuthInfo authInfo = new AuthInfo(companyId, COMPANY);

<<<<<<< HEAD
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractResponse.APPROVE);
=======
		ContractRespondCondition request = createContractRespondCondition(contractId, "APPROVE");
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
		ContractRespondCondition request = createContractRespondCondition(contractId, "APPROVE");
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractResponse.APPROVE);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.APPROVE);
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
=======
		AuthInfo authInfo = new AuthInfo(companyId, COMPANY);

		ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.APPROVE);
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
		String requestJson = objectMapper.writeValueAsString(request);

		ContractRespondResponse response = new ContractRespondResponse(UUID.fromString(contractId));
		String responseJson = objectMapper.writeValueAsString(response);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		doReturn(response).when(contractService).respond(any(), any(ContractRespondCondition.class));
=======
		doReturn(response).when(contractService).respond(any(ContractRespondCondition.class));
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
		doReturn(response).when(contractService).respond(any(ContractRespondCondition.class));
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
		doReturn(response).when(contractService).respond(any(), any(ContractRespondCondition.class));
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		doReturn(response).when(contractService).respond(any(), any(ContractRespondCondition.class));
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
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
<<<<<<< HEAD
<<<<<<< HEAD
		mockMvc.perform(delete("/contracts/"+contractId))
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
		mockMvc.perform(delete("/contracts/" + contractId)
				.sessionAttr(AUTH_INFO.name(), authInfo))
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
			.andExpect(status().isNoContent());
	}

<<<<<<< HEAD
	private ContractRespondCondition createContractRespondCondition(String contractId, ContractResponse respondResult) {
=======
=======
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
			// .param("contractId", contractId))
			.andExpect(status().isNoContent());
	}

	private ContractRespondCondition createContractRespondCondition(String contractId, String respondResult) {
<<<<<<< HEAD
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
			.andExpect(status().isNoContent());
	}

	private ContractRespondCondition createContractRespondCondition(String contractId, ContractResponse respondResult) {
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
	private ContractRespondCondition createContractRespondCondition(String contractId,
		ContractRespondType respondResult) {
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
=======
		mockMvc.perform(delete("/contracts/" + contractId)
				.sessionAttr(AUTH_INFO.name(), authInfo))
			.andExpect(status().isNoContent());
	}

	private ContractRespondCondition createContractRespondCondition(String contractId,
		ContractRespondType respondResult) {
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
		return ContractRespondCondition.builder()
			.contractId(contractId)
			.respondResult(respondResult)
			.build();
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	private ContractCreateRequest createContractCreateRequest (String companyId, String storeId) {
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
	private ContractCreateRequest createContractCreateRequest (String companyId, String storeId) {
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	private ContractCreateRequest createContractCreateRequest(String companyId, String storeId) {
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
		return ContractCreateRequest.builder()
			.companyId(companyId)
			.storeId(storeId)
<<<<<<< HEAD
			.settlementDate(10)
=======
=======
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
	private ContractCreateRequest createContractCreateRequest (String companyId, String storeId) {
		return ContractCreateRequest.builder()
			.companyId(companyId)
			.storeId(storeId)
<<<<<<< HEAD
			.sattlementDate(10)
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
			.settlementDate(10)
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
=======
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
	private ContractCreateRequest createContractCreateRequest(String senderId, String receiverRegisterNumber) {
		return ContractCreateRequest.builder()
			.senderId(senderId)
			.receiverRegisterNumber(receiverRegisterNumber)
<<<<<<< HEAD
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)
			.settlementDay(10)
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
=======
			.settlementDay(10)
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
			.build();
	}
}
