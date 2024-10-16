package com.e201.api.controller.contract.request;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.ContractResponse;

=======
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.ContractResponse;

>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
import com.e201.domain.entity.contract.ContractRespondType;

import jakarta.validation.constraints.NotBlank;
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
=======
import com.e201.domain.entity.contract.ContractRespondType;

import jakarta.validation.constraints.NotBlank;
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractRespondCondition {

	@NotBlank
	String contractId;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	ContractResponse respondResult;

	@Builder
	public ContractRespondCondition(String contractId, ContractResponse respondResult) {
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
	String respondResult;

	@Builder
	public ContractRespondCondition(String contractId, String respondResult) {
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	ContractResponse respondResult;

	@Builder
	public ContractRespondCondition(String contractId, ContractResponse respondResult) {
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85

	@NotBlank
	ContractRespondType respondResult;

	@Builder
	private ContractRespondCondition(String contractId, ContractRespondType respondResult) {
<<<<<<< HEAD
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
		this.contractId = contractId;
		this.respondResult = respondResult;
	}
}
