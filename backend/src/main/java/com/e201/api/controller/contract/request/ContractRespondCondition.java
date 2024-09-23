package com.e201.api.controller.contract.request;

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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractRespondCondition {
	String contractId;
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
		this.contractId = contractId;
		this.respondResult = respondResult;
	}
}
