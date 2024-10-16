package com.e201.api.service.contract;

import org.springframework.boot.test.context.SpringBootTest;

<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractFindResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.ContractResponse;
=======
=======
import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;
>>>>>>> 13366f8 ([#40] feat: 계약 조회 기능 구현)
=======
import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
import com.e201.domain.entity.contract.ContractRespondType;
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
import com.e201.domain.entity.contract.ContractStatus;
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.ContractResponse;
import com.e201.domain.entity.contract.ContractStatus;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;

@SpringBootTest
public class ContractServiceTest {

	@Autowired
	ContractRepository contractRepository;

	@Autowired
	ContractService sut;

	@JtaTransactional
	@DisplayName("계약(Entity)를 조회한다.")
	@Test
	void find_contract_entity_success() {
		UUID companyId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();

		// given
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		Contract contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
=======
		Contract contract = createContract(companyId, storeId, Status.COMPANY_WAITING, 10);
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract contract = createContract(companyId, storeId, Status.COMPANY_WAITING, 10);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
		contractRepository.save(contract);

		// when
		Contract actual = sut.findEntity(contract.getId());

		// then
		assertThatContractMatchExactly(actual, companyId, storeId);
	}

	@JtaTransactional
	@DisplayName("계약(Entity) List를 조회한다.")
	@Test
	void find_contract_entity_list_success() {
		//given
		UUID companyId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();
		Contract contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
		contractRepository.save(contract);

		//when
		List<ContractFindResponse> actual = sut.find(new AuthInfo(companyId, RoleType.COMPANY), ContractFindStatus.IN,
			ContractFindCond.ALL);

		//then
		assertThat(actual).isNotNull();
	}

	@DisplayName("존재하지 않는 계약(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_invoice_entity_fail() {
		// expected
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("기업이 계약 정보(Entity)를 저장한다.")
	@Test
	void company_create_contract_entity_success() {
		//given
		String senderId = UUID.randomUUID().toString();
		String receiverRegisterNumber = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(senderId, receiverRegisterNumber);
		//when
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse actual = sut.create(RoleType.COMPANY, request);
=======
		ContractCreateResponse actual = sut.create("COMPANY", request);
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateResponse actual = sut.create("COMPANY", request);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateResponse actual = sut.create(RoleType.COMPANY, request);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		ContractCreateResponse actual = sut.create(new AuthInfo(UUID.fromString(senderId), RoleType.COMPANY), request);
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("계약 생성 시 잘못된 senderType이 전달될 경우 실패한다.")
	@Test
	void company_create_contract_entity_fail() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//expect
		assertThatThrownBy(() -> sut.create(new AuthInfo(UUID.randomUUID(), RoleType.COMPANY), request)).isInstanceOf(
			IllegalArgumentException.class);
	}

	@DisplayName("식당이 계약 정보(Entity)를 저장한다.")
	@Test
	void store_create_contract_entity_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
		//when
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse actual = sut.create(RoleType.STORE, request);
=======
		ContractCreateResponse actual = sut.create("STORE", request);
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateResponse actual = sut.create("STORE", request);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateResponse actual = sut.create(RoleType.STORE, request);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		ContractCreateResponse actual = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE), request);
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)
		//then
		assertThat(actual.getId()).isNotNull();
	}

	@DisplayName("계약 정보(Entity)를 저장을 실패 시 예외가 발생한다.")
	@Test
	void create_contract_entity_fail() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
<<<<<<< HEAD
		//when
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse actual = sut.create(RoleType.STORE, request);
=======
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)
		//expect
		assertThatThrownBy(() -> sut.create(null, request)).isInstanceOf(RuntimeException.class);
=======
		ContractCreateResponse actual = sut.create("STORE", request);
		//expect
		assertThatThrownBy(() -> sut.create(" ", request)).isInstanceOf(RuntimeException.class);
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateResponse actual = sut.create("STORE", request);
		//expect
		assertThatThrownBy(() -> sut.create(" ", request)).isInstanceOf(RuntimeException.class);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractCreateResponse actual = sut.create(RoleType.STORE, request);
		//expect
		assertThatThrownBy(() -> sut.create(null, request)).isInstanceOf(RuntimeException.class);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
	}

	@DisplayName("기존의 계약 id가 존재 하지 않을 경우 예외가 발생한다.")
	@Test
	void find_exist_contract_entity_fail() {
		//given
		String contractId = UUID.randomUUID().toString();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractRespondCondition contractRespond = createContractRespondCondition(contractId, ContractResponse.APPROVE);
=======
		ContractRespondCondition contractRespond = createContractRespondCondition(contractId,
			ContractRespondType.APPROVE);
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)

		//expect
		assertThatThrownBy(() -> sut.respond(RoleType.STORE, contractRespond)).isInstanceOf(RuntimeException.class);
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		ContractRespondCondition contractRespond = createContractRespondCondition(contractId,"APPROVE");

		//expect
		assertThatThrownBy(() -> sut.respond(contractRespond)).isInstanceOf(RuntimeException.class);
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		ContractRespondCondition contractRespond = createContractRespondCondition(contractId, ContractResponse.APPROVE);

		//expect
		assertThatThrownBy(() -> sut.respond(RoleType.STORE, contractRespond)).isInstanceOf(RuntimeException.class);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
	}

	@DisplayName("계약을 수락한다.")
	@Test
	void update_contract_approve_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE),
			contractCreateRequest);
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.APPROVE);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.STORE, request);

		//then
<<<<<<< HEAD
<<<<<<< HEAD
		Contract contractResult = sut.findEntity(actual.getId());
<<<<<<< HEAD
		assertThat(contractResult).extracting("status").isEqualTo(Status.COMPLETE);
=======
		assertThat(actual.getId()).isNotNull();
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(Status.COMPLETE);
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPLETE);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		ContractCreateResponse contract = sut.create("STORE", contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,ContractResponse.APPROVE);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.STORE, request);

		//then
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		assertThat(actual.getId()).isNotNull();
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract contractResult = sut.findEntity(actual.getId());
<<<<<<< HEAD
		assertThat(contractResult).extracting("status").isEqualTo(Status.COMPLETE);
>>>>>>> d8b5f3f ([#17] test: Contract Controller 테스트 추가)
=======
		assertThat(actual.getId()).isNotNull();
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(Status.COMPLETE);
>>>>>>> d2025ea ([#17] test: Contract Controller 테스트 추가)
=======
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPLETE);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
	}

	@DisplayName("잘못된 Respond가 전송될 경우 예외가 발생한다.")
	@Test
	void update_contract_approve_fail() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE),
			contractCreateRequest);
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, null);

		//expect
		assertThatThrownBy(() -> sut.respond(RoleType.STORE, request)).isInstanceOf(RuntimeException.class);
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		ContractCreateResponse contract = sut.create("STORE", contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,null);

		//expect
<<<<<<< HEAD
		assertThatThrownBy(() -> sut.respond(request)).isInstanceOf(RuntimeException.class);
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		assertThatThrownBy(() -> sut.respond(RoleType.STORE, request)).isInstanceOf(RuntimeException.class);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
	}

	@DisplayName("기업이 계약을 거절한다.")
	@Test
	void update_contract_reject_by_company_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE),
			contractCreateRequest);
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.REJECT);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPANY_REJECT);
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		ContractCreateResponse contract = sut.create("STORE", contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(RoleType.STORE, contractCreateRequest);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,ContractResponse.REJECT);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);

		//then
<<<<<<< HEAD
		assertThat(actual.getId()).isNotNull();
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPANY_REJECT);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
	}

	@DisplayName("식당이 계약을 거절한다.")
	@Test
	void update_contract_reject_by_store_success() {
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(companyId), RoleType.COMPANY),
			contractCreateRequest);
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.REJECT);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.STORE_REJECT);
	}

	@DisplayName("계약을 삭제한다.")
	@Test
	void delete_contract_success() {
		//given
		UUID companyId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();
		// ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		// ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);
		Contract contract = Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.settlementDay(10)
			.status(ContractStatus.COMPLETE)
			.build();
<<<<<<< HEAD

		Contract savedContract = contractRepository.save(contract);

		String contractId = savedContract.getId().toString();

		//when
		sut.delete(contractId);

		//then
		Contract contractResult = sut.findEntity(UUID.fromString(contractId));
		assertThat(contractResult).extracting("deleteYN").isEqualTo("Y");
	}

<<<<<<< HEAD
<<<<<<< HEAD
	private ContractRespondCondition createContractRespondCondition(String contractId, ContractResponse respondResult){
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
		ContractCreateResponse contract = sut.create("COMPANY", contractCreateRequest);
=======
		ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

		String contractId = contract.getId().toString();
		ContractRespondCondition request = createContractRespondCondition(contractId,ContractResponse.REJECT);

		//when
		ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);

		//then
		Contract contractResult = sut.findEntity(actual.getId());
		assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.STORE_REJECT);
	}

<<<<<<< HEAD
	private ContractRespondCondition createContractRespondCondition(String contractId, String respondResult){
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	@DisplayName("계약을 삭제한다.")
	@Test
	void delete_contract_success(){
		//given
		String companyId = UUID.randomUUID().toString();
		String storeId = UUID.randomUUID().toString();
		ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
		ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);
=======
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)

		Contract savedContract = contractRepository.save(contract);

		String contractId = savedContract.getId().toString();

		//when
		sut.delete(contractId);

		//then
		Contract contractResult = sut.findEntity(UUID.fromString(contractId));
		assertThat(contractResult).extracting("deleteYN").isEqualTo("Y");
	}

	private ContractRespondCondition createContractRespondCondition(String contractId, ContractResponse respondResult){
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
	private ContractRespondCondition createContractRespondCondition(String contractId, ContractResponse respondResult) {
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
=======
	private ContractRespondCondition createContractRespondCondition(String contractId,
		ContractRespondType respondResult) {
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
		return ContractRespondCondition.builder()
			.contractId(contractId)
			.respondResult(respondResult)
			.build();
	}

	private ContractCreateRequest createContractCreateRequest(String senderId, String receiverRegisterNumber) {
		return ContractCreateRequest.builder()
<<<<<<< HEAD
			.companyId(companyId)
			.storeId(storeId)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			.settlementDate(10)
			.build();
	}

<<<<<<< HEAD
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate){
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
			.sattlementDate(10)
			.build();
	}

	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
			.settlementDate(10)
			.build();
	}

	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate){
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate) {
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
=======
=======
			.senderId(senderId)
			.receiverRegisterNumber(receiverRegisterNumber)
>>>>>>> e31cce2 ([#25] refactor: OCR관련 로직 변경에 따른 코드 수정)
			.settlementDay(10)
			.build();
	}

	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDay) {
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.status(contractStatus)
			.settlementDay(settlementDay)
			.build();
	}

	private void assertThatContractMatchExactly(Contract contract, UUID companyId, UUID storeId) {
		assertThat(contract)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			.extracting("companyId", "storeId", "status", "settlementDate")
=======
			.extracting("companyId", "storeId", "status", "settlementDay")
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
			.containsExactly(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
=======
			.extracting("companyId", "storeId", "status", "sattlementDate")
			.containsExactly(companyId, storeId, Status.COMPANY_WAITING,10);
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
			.extracting("companyId", "storeId", "status", "settlementDate")
			.containsExactly(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
	}
=======
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
@SpringBootTest
public class ContractServiceTest {

	// @Autowired
	// ContractRepository contractRepository;
	//
	// @Autowired
	// ContractService sut;
	// @Autowired
	// private ContractCustomRepositoryImpl contractCustomRepositoryImpl;
	//
	// @DisplayName("계약(Entity)를 조회한다.")
	// @Test
	// void find_contract_entity_success() {
	// 	UUID companyId = UUID.randomUUID();
	// 	UUID storeId = UUID.randomUUID();
	//
	// 	// given
	// 	Contract contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
	// 	contractRepository.save(contract);
	//
	// 	// when
	// 	Contract actual = sut.findEntity(contract.getId());
	//
	// 	// then
	// 	assertThatContractMatchExactly(actual, companyId, storeId);
	// }
	//
	// @JtaTransactional
	// @DisplayName("계약(Entity) List를 조회한다.")
	// @Test
	// void find_contract_entity_list_success() {
	// 	//given
	// 	UUID companyId = UUID.randomUUID();
	// 	UUID storeId = UUID.randomUUID();
	// 	Contract contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
	// 	contractRepository.save(contract);
	//
	// 	//when
	// 	List<ContractFindResponse> actual = sut.find(new AuthInfo(companyId, RoleType.COMPANY), ContractFindStatus.IN,
	// 		ContractFindCond.ALL);
	//
	// 	//then
	// 	assertThat(actual).isNotNull();
	// }
	//
	// @DisplayName("존재하지 않는 계약(Entity)를 조회하면 예외가 발생한다.")
	// @Test
	// void find_invoice_entity_fail() {
	// 	// expected
	// 	assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	// }
	//
	// @DisplayName("기업이 계약 정보(Entity)를 저장한다.")
	// @Test
	// void company_create_contract_entity_success() {
	// 	//given
	// 	String senderId = UUID.randomUUID().toString();
	// 	String receiverRegisterNumber = UUID.randomUUID().toString();
	// 	ContractCreateRequest request = createContractCreateRequest(senderId, receiverRegisterNumber);
	// 	//when
	// 	ContractCreateResponse actual = sut.create(new AuthInfo(UUID.fromString(senderId), RoleType.COMPANY), request);
	// 	//then
	// 	assertThat(actual.getId()).isNotNull();
	// }
	//
	// @DisplayName("계약 생성 시 잘못된 senderType이 전달될 경우 실패한다.")
	// @Test
	// void company_create_contract_entity_fail() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
	// 	//expect
	// 	assertThatThrownBy(() -> sut.create(new AuthInfo(UUID.randomUUID(), RoleType.COMPANY), request)).isInstanceOf(
	// 		IllegalArgumentException.class);
	// }
	//
	// @DisplayName("식당이 계약 정보(Entity)를 저장한다.")
	// @Test
	// void store_create_contract_entity_success() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
	// 	//when
	// 	ContractCreateResponse actual = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE), request);
	// 	//then
	// 	assertThat(actual.getId()).isNotNull();
	// }
	//
	// @DisplayName("계약 정보(Entity)를 저장을 실패 시 예외가 발생한다.")
	// @Test
	// void create_contract_entity_fail() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest request = createContractCreateRequest(companyId, storeId);
	// 	//expect
	// 	assertThatThrownBy(() -> sut.create(null, request)).isInstanceOf(RuntimeException.class);
	// }
	//
	// @DisplayName("기존의 계약 id가 존재 하지 않을 경우 예외가 발생한다.")
	// @Test
	// void find_exist_contract_entity_fail() {
	// 	//given
	// 	String contractId = UUID.randomUUID().toString();
	// 	ContractRespondCondition contractRespond = createContractRespondCondition(contractId,
	// 		ContractRespondType.APPROVE);
	//
	// 	//expect
	// 	assertThatThrownBy(() -> sut.respond(RoleType.STORE, contractRespond)).isInstanceOf(RuntimeException.class);
	// }
	//
	// @DisplayName("계약을 수락한다.")
	// @Test
	// void update_contract_approve_success() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
	// 	ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE),
	// 		contractCreateRequest);
	//
	// 	String contractId = contract.getId().toString();
	// 	ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.APPROVE);
	//
	// 	//when
	// 	ContractRespondResponse actual = sut.respond(RoleType.STORE, request);
	//
	// 	//then
	// 	Contract contractResult = sut.findEntity(actual.getId());
	// 	assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPLETE);
	// }
	//
	// @DisplayName("잘못된 Respond가 전송될 경우 예외가 발생한다.")
	// @Test
	// void update_contract_approve_fail() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
	// 	ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE),
	// 		contractCreateRequest);
	//
	// 	String contractId = contract.getId().toString();
	// 	ContractRespondCondition request = createContractRespondCondition(contractId, null);
	//
	// 	//expect
	// 	assertThatThrownBy(() -> sut.respond(RoleType.STORE, request)).isInstanceOf(RuntimeException.class);
	// }
	//
	// @DisplayName("기업이 계약을 거절한다.")
	// @Test
	// void update_contract_reject_by_company_success() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
	// 	ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(storeId), RoleType.STORE),
	// 		contractCreateRequest);
	//
	// 	String contractId = contract.getId().toString();
	// 	ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.REJECT);
	//
	// 	//when
	// 	ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);
	//
	// 	//then
	// 	Contract contractResult = sut.findEntity(actual.getId());
	// 	assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.COMPANY_REJECT);
	// }
	//
	// @DisplayName("식당이 계약을 거절한다.")
	// @Test
	// void update_contract_reject_by_store_success() {
	// 	//given
	// 	String companyId = UUID.randomUUID().toString();
	// 	String storeId = UUID.randomUUID().toString();
	// 	ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
	// 	ContractCreateResponse contract = sut.create(new AuthInfo(UUID.fromString(companyId), RoleType.COMPANY),
	// 		contractCreateRequest);
	//
	// 	String contractId = contract.getId().toString();
	// 	ContractRespondCondition request = createContractRespondCondition(contractId, ContractRespondType.REJECT);
	//
	// 	//when
	// 	ContractRespondResponse actual = sut.respond(RoleType.COMPANY, request);
	//
	// 	//then
	// 	Contract contractResult = sut.findEntity(actual.getId());
	// 	assertThat(contractResult).extracting("status").isEqualTo(ContractStatus.STORE_REJECT);
	// }
	//
	// @DisplayName("계약을 삭제한다.")
	// @Test
	// void delete_contract_success() {
	// 	//given
	// 	UUID companyId = UUID.randomUUID();
	// 	UUID storeId = UUID.randomUUID();
	// 	// ContractCreateRequest contractCreateRequest = createContractCreateRequest(companyId, storeId);
	// 	// ContractCreateResponse contract = sut.create(RoleType.COMPANY, contractCreateRequest);
	// 	Contract contract = Contract.builder()
	// 		.companyId(companyId)
	// 		.storeId(storeId)
	// 		.settlementDay(10)
	// 		.status(ContractStatus.COMPLETE)
	// 		.build();
	//
	// 	Contract savedContract = contractRepository.save(contract);
	//
	// 	String contractId = savedContract.getId().toString();
	//
	// 	//when
	// 	sut.delete(contractId);
	//
	// 	//then
	// 	Contract contractResult = sut.findEntity(UUID.fromString(contractId));
	// 	assertThat(contractResult).extracting("deleteYN").isEqualTo("Y");
	// }
	//
	// private ContractRespondCondition createContractRespondCondition(String contractId,
	// 	ContractRespondType respondResult) {
	// 	return ContractRespondCondition.builder()
	// 		.contractId(contractId)
	// 		.respondResult(respondResult)
	// 		.build();
	// }
	//
	// private ContractCreateRequest createContractCreateRequest(String senderId, String receiverRegisterNumber) {
	// 	return ContractCreateRequest.builder()
	// 		.senderId(senderId)
	// 		.receiverRegisterNumber(receiverRegisterNumber)
	// 		.settlementDay(10)
	// 		.build();
	// }
	//
	// private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDay) {
	// 	return Contract.builder()
	// 		.companyId(companyId)
	// 		.storeId(storeId)
	// 		.status(contractStatus)
	// 		.settlementDay(settlementDay)
	// 		.build();
	// }
	//
	// private void assertThatContractMatchExactly(Contract contract, UUID companyId, UUID storeId) {
	// 	assertThat(contract)
	// 		.extracting("companyId", "storeId", "status", "settlementDay")
	// 		.containsExactly(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
	// }
<<<<<<< HEAD
>>>>>>> 49e217d ([#59] fix: testcode error 수정)
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
}
