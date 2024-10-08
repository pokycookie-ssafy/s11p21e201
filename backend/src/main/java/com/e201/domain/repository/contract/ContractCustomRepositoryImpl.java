package com.e201.domain.repository.contract;

import static com.e201.domain.entity.company.QCompany.*;
import static com.e201.domain.entity.company.QDepartment.*;
import static com.e201.domain.entity.company.QEmployee.*;
import static com.e201.domain.entity.contract.ContractStatus.*;
import static com.e201.domain.entity.contract.QContract.*;
import static com.e201.domain.entity.store.QStore.*;
import static com.e201.domain.entity.store.QStoreInfo.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.e201.api.controller.contract.request.ContractFindRequest;
import com.e201.api.controller.contract.response.ContractFindResponse;
import com.e201.api.controller.contract.response.EmployeeFindStoreResponse;
import com.e201.domain.entity.company.QCompany;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.contract.QContract;
import com.e201.domain.entity.store.QStore;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.querydsl.core.types.Projections;
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
	public List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId) {
		QContract contract = QContract.contract;
		return contractQueryFactory.selectFrom(contract)
			.where(contract.storeId.eq(storeId),
				contract.companyId.eq(companyId),
				contract.deleteYN.eq("N"))
			.fetch();
	}

	@Override
	public List<EmployeeFindStoreResponse> findStores(AuthInfo authInfo) {
		// find companyId using employee ID;
		UUID companyId = companyQueryFactory
			.select(company.id)
			.from(employee)
			.join(employee.department, department)
			.join(department.company, company)
			.where(employee.id.eq(authInfo.getId()))
			.fetchOne();

		// find contracts using companyId;
		List<UUID> stores = contractQueryFactory
			.select(contract.storeId)
			.from(contract)
			.where(contract.companyId.eq(companyId),
				contract.status.eq(COMPLETE))
			.fetch();

		// createResponse
		return storeQueryFactory.select(Projections.constructor(EmployeeFindStoreResponse.class,
				storeInfo.name.as("storeName"),
				storeInfo.businessAddress.as("storeAddress"),
				storeInfo.phone.as("storePhone")))
			.from(store)
			.where(store.id.in(stores))
			.fetch();
	}

	@Override
	public List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindRequest request) {
		List<Contract> contracts = findContracts(authInfo, request);
		Map<UUID, Map<String, String>> companyMap = getCompanyMap(contracts);
		Map<UUID, Map<String, String>> storeMap = getStoreMap(contracts);
		List<ContractFindResponse> responses = createContractFindResponse(contracts, companyMap, storeMap);
		return responses;
	}

	private List<ContractFindResponse> createContractFindResponse(List<Contract> contracts,
		Map<UUID, Map<String, String>> companyMap,
		Map<UUID, Map<String, String>> storeMap) {
		return contracts.stream()
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
	}

	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request) {
		return contractQueryFactory
			.selectFrom(contract)
			.where(
				eqStatus(authInfo, request),
				eqId(authInfo)
			)
			.fetch();
	}

	private BooleanExpression eqStatus(AuthInfo authInfo, ContractFindRequest request) {
		return switch (request.getStatus()) {
			case ALL -> null;
			case IN -> getProgressStatusExpression(authInfo, request);
			case COMPLETE -> contract.status.eq(ContractStatus.COMPLETE);
			case CANCELED -> contract.deleteYN.eq("Y");
			case REJECT -> contract.status.eq(STORE_REJECT).or(contract.status.eq(STORE_REJECT));
		};
	}

	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindRequest request) {

		BooleanExpression senderCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(COMPANY_REQUEST) : contract.status.eq(STORE_REQUEST);

		BooleanExpression receiverCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(STORE_REQUEST) : contract.status.eq(COMPANY_REQUEST);

		return switch (request.getUserCond()) {
			case ALL -> senderCondition.or(receiverCondition);
			case SENDER -> senderCondition;
			case RECEIVER -> receiverCondition;
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
		return storeQueryFactory.select(store.id, store.storeInfo.name, store.email, store.storeInfo.phone,
				store.storeInfo.businessAddress)
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
			.select(company.id, company.companyInfo.name, company.email, company.companyInfo.phone,
				company.companyInfo.businessAddress)
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
