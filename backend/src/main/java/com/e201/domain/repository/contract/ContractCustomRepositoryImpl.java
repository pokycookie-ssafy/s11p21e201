package com.e201.domain.repository.contract;

import static com.e201.domain.entity.contract.ContractStatus.*;
import static com.e201.domain.entity.contract.QContract.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.e201.api.controller.contract.response.ContractFindResponse;
import com.e201.domain.entity.company.QCompany;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractFindCond;
import com.e201.domain.entity.contract.ContractFindStatus;
import com.e201.domain.entity.contract.QContract;
import com.e201.domain.entity.store.QStore;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class ContractCustomRepositoryImpl implements ContractCustomRepository {

	private final JPAQueryFactory contractQueryFactory;
	private final JPAQueryFactory companyQueryFactory;
	private final JPAQueryFactory storeQueryFactory;

	public ContractCustomRepositoryImpl(@Qualifier("contractJpaQueryFactory") JPAQueryFactory contractQueryFactory,
		@Qualifier("companyJpaQueryFactory") JPAQueryFactory companyQueryFactory,
		@Qualifier("storeJpaQueryFactory") JPAQueryFactory storeQueryFactory) {
		this.contractQueryFactory = contractQueryFactory;
		this.companyQueryFactory = companyQueryFactory;
		this.storeQueryFactory = storeQueryFactory;
	}

	@Override
	public List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindStatus status,
		ContractFindCond cond, LocalDateTime lastContractDate, int pageSize) {
		// 1. contractDB에서 계약 데이터 조회
		QContract contract = QContract.contract;
		List<Contract> contracts = contractQueryFactory
			.selectFrom(contract)
			.where(
				lastContractDate != null ? contract.createdAt.gt(lastContractDate) :
					null,
				eqStatus(authInfo, status, cond),
				eqId(authInfo),
				contract.deleteYN.eq("N"))
			.orderBy(contract.createdAt.desc())
			.limit(pageSize)
			.fetch();

		Map<UUID, Map<String, String>> companyMap = getCompanyMap(contracts);
		Map<UUID, Map<String, String>> storeMap = getStoreMap(contracts);

		// DTO로 변환
		List<ContractFindResponse> result = contracts.stream()
			.map(contractData -> new ContractFindResponse(
				String.valueOf(contractData.getId()),
				String.valueOf(contractData.getCompanyId()),
				companyMap.get(contractData.getCompanyId()).get("companyName"),
				companyMap.get(contractData.getCompanyId()).get("companyEmail"),
				companyMap.get(contractData.getCompanyId()).get("companyPhone"),
				companyMap.get(contractData.getCompanyId()).get("companyAddress"),
				String.valueOf(contractData.getStoreId()),
				storeMap.get(contractData.getStoreId()).get("storeName"),
				storeMap.get(contractData.getStoreId()).get("storeEmail"),
				storeMap.get(contractData.getStoreId()).get("storePhone"),
				storeMap.get(contractData.getStoreId()).get("storeAddress"),
				contractData.getCreatedAt(),
				contractData.getSettlementDay(),
				String.valueOf(contractData.getStatus())
			))
			.collect(Collectors.toList());

		return result;
	}

	private BooleanExpression eqStatus(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond) {
		if (status == null)
			return null;

		return switch (status) {
			case IN -> getProgressStatusExpression(authInfo, cond);
			case REJECT -> contract.status.eq(COMPANY_REJECT).or(contract.status.eq(STORE_REJECT));
			case CANCELED -> contract.status.eq(CANCEL);
			case COMPLETE -> contract.status.eq(COMPLETE);
			default -> null;
		};
	}

	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindCond cond) {
		if (authInfo == null || cond == null)
			return null;

		BooleanExpression senderCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(COMPANY_REQUEST) : contract.status.eq(STORE_REQUEST);

		BooleanExpression receiverCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(STORE_REQUEST) : contract.status.eq(COMPANY_REQUEST);

		return switch (cond) {
			case SENDER -> senderCondition;
			case RECEIVER -> receiverCondition;
			default -> senderCondition.or(receiverCondition);
		};
	}

	private BooleanExpression eqId(AuthInfo authInfo) {
		return switch (authInfo.getRoleType()) {
			case STORE -> contract.storeId.eq(authInfo.getId());
			case COMPANY -> contract.companyId.eq(authInfo.getId());
			default -> throw new IllegalStateException("Unexpected value: " + authInfo.getRoleType());
		};
	}

	private Map<UUID, Map<String, String>> getStoreMap(List<Contract> contracts) {
		Set<UUID> storeIds = contracts.stream()
			.map(Contract::getStoreId)
			.collect(Collectors.toSet());

		QStore store = QStore.store;
		return storeQueryFactory.select(store.id, store.storeInfo.name)
			.from(store)
			.where(store.id.in(storeIds),
				store.deleteYN.eq("N"))
			.fetch()
			.stream()
			.collect(Collectors.toMap(
				tuple -> tuple.get(store.id),
				tuple -> {
					Map<String, String> storeInfo = new HashMap<>();
					storeInfo.put("storeName", tuple.get(store.storeInfo.name));
					storeInfo.put("storeEmail", tuple.get(store.email));
					storeInfo.put("storePhone", tuple.get(store.storeInfo.phone));
					storeInfo.put("storeAddress", tuple.get(store.storeInfo.businessAddress));
					return storeInfo;
				}
			));
	}

	private Map<UUID, Map<String, String>> getCompanyMap(List<Contract> contracts) {
		Set<UUID> companyIds = contracts.stream()
			.map(Contract::getCompanyId)
			.collect(Collectors.toSet());

		QCompany company = QCompany.company;
		return companyQueryFactory
			.select(company.id, company.companyInfo.name)
			.from(company)
			.where(company.id.in(companyIds))
			.fetch()
			.stream()
			.collect(Collectors.toMap(
				tuple -> tuple.get(company.id),
				tuple -> {
					Map<String, String> companyInfo = new HashMap<>();
					companyInfo.put("companyName", tuple.get(company.companyInfo.name));
					companyInfo.put("companyEmail", tuple.get(company.email));
					companyInfo.put("companyPhone", tuple.get(company.companyInfo.phone));
					companyInfo.put("companyAddress", tuple.get(company.companyInfo.businessAddress));
					return companyInfo;
				}
			));
	}
}
