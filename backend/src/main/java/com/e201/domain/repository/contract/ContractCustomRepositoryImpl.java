package com.e201.domain.repository.contract;

import static com.e201.domain.entity.company.QCompany.*;
import static com.e201.domain.entity.company.QDepartment.*;
import static com.e201.domain.entity.company.QEmployee.*;
import static com.e201.domain.entity.contract.ContractStatus.*;
import static com.e201.domain.entity.contract.QContract.*;
import static com.e201.domain.entity.store.QStore.*;

<<<<<<< HEAD
<<<<<<< HEAD
import java.time.LocalDateTime;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import java.util.ArrayList;
>>>>>>> eae207b ([#60] refactor: Contract 조회 로직 수정)
=======
import java.util.ArrayList;
>>>>>>> dbe64c6 ([#60] refactor: Contract 조회 로직 수정)
=======
import java.util.ArrayList;
>>>>>>> e104de7 ([#60] refactor: Contract 조회 로직 수정)
=======
>>>>>>> 96dbfb8 ([#85] feat: employee가 계약된 가게를 조회한다.)
=======
>>>>>>> 8560af0 ([#85] feat: employee가 계약된 가게를 조회한다.)
import java.util.HashMap;
=======
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
import java.util.HashMap;
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
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

<<<<<<< HEAD
<<<<<<< HEAD
@Repository
public class ContractCustomRepositoryImpl implements ContractCustomRepository {
=======
import ch.qos.logback.core.status.Status;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Repository
public class ContractCustomRepositoryImpl implements ContractCustomRepository{
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
@Repository
public class ContractCustomRepositoryImpl implements ContractCustomRepository {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	public List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindStatus status,
		ContractFindCond cond, LocalDateTime lastContractDate, int pageSize) {
=======
	public List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond, LocalDateTime lastContractDate, int pageSize) {
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
	public List<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindStatus status,
		ContractFindCond cond, LocalDateTime lastContractDate, int pageSize) {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
		// 1. contractDB에서 계약 데이터 조회
=======
	public List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId) {
>>>>>>> eae207b ([#60] refactor: Contract 조회 로직 수정)
=======
	public List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId) {
>>>>>>> dbe64c6 ([#60] refactor: Contract 조회 로직 수정)
=======
	public List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId) {
>>>>>>> e104de7 ([#60] refactor: Contract 조회 로직 수정)
		QContract contract = QContract.contract;
		return contractQueryFactory.selectFrom(contract)
			.where(contract.storeId.eq(storeId),
				contract.companyId.eq(companyId),
				contract.deleteYN.eq("N"))
			.fetch();
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		Map<UUID, Map<String, String>> companyMap = getCompanyMap(contracts);
		Map<UUID, Map<String, String>> storeMap = getStoreMap(contracts);
=======
		Map<UUID, String> companyMap = getCompanyMap(contracts);
		Map<UUID, String> storeMap = getStoreMap(contracts);
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
		Map<UUID, Map<String, String>> companyMap = getCompanyMap(contracts);
		Map<UUID, Map<String, String>> storeMap = getStoreMap(contracts);
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
=======
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
		List<UUID> stores = companyQueryFactory
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
		List<UUID> stores = companyQueryFactory
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
=======
	@Override
	public Page<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindRequest request,
		Pageable pageable) {
		List<Contract> contracts = findContracts(authInfo, request, pageable);
		Map<UUID, Map<String, String>> companyMap = getCompanyMap(contracts);
		Map<UUID, Map<String, String>> storeMap = getStoreMap(contracts);
>>>>>>> dbe64c6 ([#60] refactor: Contract 조회 로직 수정)
=======
	@Override
	public Page<ContractFindResponse> findMyContracts(AuthInfo authInfo, ContractFindRequest request,
		Pageable pageable) {
		List<Contract> contracts = findContracts(authInfo, request, pageable);
		Map<UUID, Map<String, String>> companyMap = getCompanyMap(contracts);
		Map<UUID, Map<String, String>> storeMap = getStoreMap(contracts);
>>>>>>> e104de7 ([#60] refactor: Contract 조회 로직 수정)
		List<ContractFindResponse> responses = createContractFindResponse(contracts, companyMap, storeMap);
<<<<<<< HEAD
		JPAQuery<Long> countQuery = createCountQuery(authInfo, request);
		return PageableExecutionUtils.getPage(responses, pageable, countQuery::fetchFirst);
	}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> eae207b ([#60] refactor: Contract 조회 로직 수정)
=======
>>>>>>> dbe64c6 ([#60] refactor: Contract 조회 로직 수정)
=======
>>>>>>> e104de7 ([#60] refactor: Contract 조회 로직 수정)

	private JPAQuery<Long> createCountQuery(AuthInfo authInfo, ContractFindRequest request) {
		return contractQueryFactory
			.select(contract.count())
			.from(contract)
			.where(
				eqStatus(authInfo, request),
				eqId(authInfo)
			);
=======
		return responses;
>>>>>>> 14fa6f8 ([#78] refactor: 계약 조회 기능 수정)
	}

	private List<ContractFindResponse> createContractFindResponse(List<Contract> contracts,
		Map<UUID, Map<String, String>> companyMap,
		Map<UUID, Map<String, String>> storeMap) {
		return contracts.stream()
			.map(contractData -> new ContractFindResponse(
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
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
<<<<<<< HEAD
				contractData.getCreatedAt(),
				contractData.getSettlementDay(),
				String.valueOf(contractData.getStatus())
=======
				contractData.getCreatedAt(),
				contractData.getSettlementDay(),
				String.valueOf(contractData.getId()),
				String.valueOf(contractData.getStoreId()),
				String.valueOf(contractData.getCompanyId()),
				storeMap.get(contractData.getStoreId()),
				companyMap.get(contractData.getCompanyId())
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
				contractData.getCreatedAt(),
				contractData.getSettlementDay(),
				String.valueOf(contractData.getStatus())
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
			))
			.collect(Collectors.toList());
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
	@Override
	public List<Contract> findContractWithCompanyIdAndStoreId(UUID storeId, UUID companyId) {
		QContract contract = QContract.contract;
		return contractQueryFactory.selectFrom(contract)
			.where(contract.storeId.eq(storeId),
				contract.companyId.eq(companyId),
				contract.deleteYN.eq("N"))
			.fetch();
	}

>>>>>>> 65a8c38 ([#58] feat: contractId 조회 기능 추가 구현)
	private BooleanExpression eqStatus(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond) {
		if (status == null)
			return null;

		return switch (status) {
=======
	private BooleanExpression eqStatus(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond){
		if(status == null) return null;

		return switch (status){
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
	private BooleanExpression eqStatus(AuthInfo authInfo, ContractFindStatus status, ContractFindCond cond) {
		if (status == null)
			return null;

		return switch (status) {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
			case IN -> getProgressStatusExpression(authInfo, cond);
			case REJECT -> contract.status.eq(COMPANY_REJECT).or(contract.status.eq(STORE_REJECT));
			case CANCELED -> contract.status.eq(CANCEL);
			case COMPLETE -> contract.status.eq(COMPLETE);
			default -> null;
		};
	}

<<<<<<< HEAD
<<<<<<< HEAD
	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindCond cond) {
		if (authInfo == null || cond == null)
			return null;
=======
	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request,
		Pageable pageable){
=======
	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request) {
>>>>>>> 8560af0 ([#85] feat: employee가 계약된 가게를 조회한다.)
		return contractQueryFactory
			.selectFrom(contract)
			.where(
				eqStatus(authInfo, request),
				eqId(authInfo)
			)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
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

<<<<<<< HEAD
	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindRequest request){
>>>>>>> eae207b ([#60] refactor: Contract 조회 로직 수정)

=======
	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request,
		Pageable pageable){
=======
	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request){
>>>>>>> 14fa6f8 ([#78] refactor: 계약 조회 기능 수정)
=======
	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request) {
>>>>>>> 96dbfb8 ([#85] feat: employee가 계약된 가게를 조회한다.)
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

<<<<<<< HEAD
>>>>>>> e104de7 ([#60] refactor: Contract 조회 로직 수정)
		BooleanExpression senderCondition = (authInfo.getRoleType() == RoleType.COMPANY)?
=======
		BooleanExpression senderCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
>>>>>>> 96dbfb8 ([#85] feat: employee가 계약된 가게를 조회한다.)
			contract.status.eq(COMPANY_REQUEST) : contract.status.eq(STORE_REQUEST);

		BooleanExpression receiverCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(STORE_REQUEST) : contract.status.eq(COMPANY_REQUEST);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

		return switch (cond) {
=======
	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindCond cond){
		if (authInfo == null || cond == null) return null;
=======
	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindCond cond) {
		if (authInfo == null || cond == null)
			return null;
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
=======
	private List<Contract> findContracts(AuthInfo authInfo, ContractFindRequest request,
		Pageable pageable){
		return contractQueryFactory
			.selectFrom(contract)
			.where(
				eqStatus(authInfo, request),
				eqId(authInfo)
			)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	private BooleanExpression eqStatus(AuthInfo authInfo, ContractFindRequest request){
		return switch(request.getStatus()){
			case ALL -> null;
			case IN -> getProgressStatusExpression(authInfo, request);
			case COMPLETE -> contract.status.eq(ContractStatus.COMPLETE);
			case CANCELED -> contract.deleteYN.eq("Y");
			case REJECT -> contract.status.eq(STORE_REJECT).or(contract.status.eq(STORE_REJECT));
=======
		
		return switch (request.getUserCond()){
=======

		return switch (request.getUserCond()) {
>>>>>>> 96dbfb8 ([#85] feat: employee가 계약된 가게를 조회한다.)
			case ALL -> senderCondition.or(receiverCondition);
			case SENDER -> senderCondition;
			case RECEIVER -> receiverCondition;
>>>>>>> e104de7 ([#60] refactor: Contract 조회 로직 수정)
		};
	}

	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindRequest request){
>>>>>>> dbe64c6 ([#60] refactor: Contract 조회 로직 수정)
=======
	private BooleanExpression getProgressStatusExpression(AuthInfo authInfo, ContractFindRequest request) {
>>>>>>> 8560af0 ([#85] feat: employee가 계약된 가게를 조회한다.)

		BooleanExpression senderCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(COMPANY_REQUEST) : contract.status.eq(STORE_REQUEST);

		BooleanExpression receiverCondition = (authInfo.getRoleType() == RoleType.COMPANY) ?
			contract.status.eq(STORE_REQUEST) : contract.status.eq(COMPANY_REQUEST);
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
		return switch(cond){
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
		return switch (cond) {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
=======
		
		return switch (request.getUserCond()){
=======

		return switch (request.getUserCond()) {
>>>>>>> 8560af0 ([#85] feat: employee가 계약된 가게를 조회한다.)
			case ALL -> senderCondition.or(receiverCondition);
>>>>>>> eae207b ([#60] refactor: Contract 조회 로직 수정)
=======
		
		return switch (request.getUserCond()){
			case ALL -> senderCondition.or(receiverCondition);
>>>>>>> dbe64c6 ([#60] refactor: Contract 조회 로직 수정)
			case SENDER -> senderCondition;
			case RECEIVER -> receiverCondition;
		};
	}

<<<<<<< HEAD
<<<<<<< HEAD
	private BooleanExpression eqId(AuthInfo authInfo) {
		return switch (authInfo.getRoleType()) {
=======
	private BooleanExpression eqId(AuthInfo authInfo){
		return switch (authInfo.getRoleType()){
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
	private BooleanExpression eqId(AuthInfo authInfo) {
		return switch (authInfo.getRoleType()) {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
			case STORE -> contract.storeId.eq(authInfo.getId());
			case COMPANY -> contract.companyId.eq(authInfo.getId());
			default -> throw new IllegalStateException("Unexpected value: " + authInfo.getRoleType());
		};
	}

<<<<<<< HEAD
<<<<<<< HEAD
	private Map<UUID, Map<String, String>> getStoreMap(List<Contract> contracts) {
=======
	private Map<UUID, String> getStoreMap(List<Contract> contracts){
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
	private Map<UUID, Map<String, String>> getStoreMap(List<Contract> contracts) {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
				tuple -> {
					Map<String, String> storeInfo = new HashMap<>();
					storeInfo.put("storeName", tuple.get(store.storeInfo.name));
					storeInfo.put("storeEmail", tuple.get(store.email));
					storeInfo.put("storePhone", tuple.get(store.storeInfo.phone));
					storeInfo.put("storeAddress", tuple.get(store.storeInfo.businessAddress));
					return storeInfo;
				}
<<<<<<< HEAD
			));
	}

	private Map<UUID, Map<String, String>> getCompanyMap(List<Contract> contracts) {
=======
				tuple -> tuple.get(store.storeInfo.name)
			));
	}

	private Map<UUID, String> getCompanyMap(List<Contract> contracts){
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
			));
	}

	private Map<UUID, Map<String, String>> getCompanyMap(List<Contract> contracts) {
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
				tuple -> {
					Map<String, String> companyInfo = new HashMap<>();
					companyInfo.put("companyName", tuple.get(company.companyInfo.name));
					companyInfo.put("companyEmail", tuple.get(company.email));
					companyInfo.put("companyPhone", tuple.get(company.companyInfo.phone));
					companyInfo.put("companyAddress", tuple.get(company.companyInfo.businessAddress));
					return companyInfo;
				}
<<<<<<< HEAD
=======
				tuple -> tuple.get(company.companyInfo.name)
>>>>>>> 31cf432 ([#40] feat: Contract 조회 기능 구현)
=======
>>>>>>> 54ad0bd ([#40] feat: 계약 조회 기능 구현)
			));
	}
}
