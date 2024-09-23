package com.e201.api.controller.contract.request;

import java.util.UUID;

import com.e201.domain.entity.contract.Contract;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.ContractStatus;
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.ContractStatus;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContractCreateRequest {
	private String companyId;
	private String storeId;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	private int settlementDate;

	@Builder
	public ContractCreateRequest(String companyId, String storeId, int settlementDate) {
		this.companyId = companyId;
		this.storeId = storeId;
		this.settlementDate = settlementDate;
	}

	public Contract toEntity(ContractStatus status){
		return Contract.builder()
			.companyId(UUID.fromString(companyId))
			.storeId(UUID.fromString(storeId))
			.settlementDate(settlementDate)
=======
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
	private int sattlementDate;
=======
	private int settlementDate;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)

	@Builder
	public ContractCreateRequest(String companyId, String storeId, int settlementDate) {
		this.companyId = companyId;
		this.storeId = storeId;
		this.settlementDate = settlementDate;
	}

	public Contract toEntity(ContractStatus status){
		return Contract.builder()
			.companyId(UUID.fromString(companyId))
			.storeId(UUID.fromString(storeId))
<<<<<<< HEAD
			.sattlementDate(sattlementDate)
<<<<<<< HEAD
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
			.settlementDate(settlementDate)
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
			.status(status)
			.build();
	}
}
