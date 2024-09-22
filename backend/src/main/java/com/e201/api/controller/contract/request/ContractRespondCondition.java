package com.e201.api.controller.contract.request;

<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.ContractResponse;

=======
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractRespondCondition {
	String contractId;
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
		this.contractId = contractId;
		this.respondResult = respondResult;
	}
}
