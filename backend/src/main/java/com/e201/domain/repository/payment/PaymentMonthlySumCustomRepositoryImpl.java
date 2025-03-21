package com.e201.domain.repository.payment;

import static com.e201.domain.entity.company.QCompany.*;
import static com.e201.domain.entity.contract.QContract.*;
import static com.e201.domain.entity.payment.QPaymentMonthlySum.*;
import static com.e201.domain.entity.store.QStore.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Qualifier;

import com.e201.api.controller.settlement.request.SettlementFindRequest;
import com.e201.api.controller.settlement.response.SettlementFindResponse;
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class PaymentMonthlySumCustomRepositoryImpl implements PaymentMonthlySumCustomRepository {

	private final JPAQueryFactory paymentJpaQueryFactory;
	private final JPAQueryFactory contractJpaQueryFactory;
	private final JPAQueryFactory companyJpaQueryFactory;
	private final JPAQueryFactory storeJpaQueryFactory;

	public PaymentMonthlySumCustomRepositoryImpl(
		@Qualifier("paymentJpaQueryFactory") JPAQueryFactory paymentJpaQueryFactory,
		@Qualifier("contractJpaQueryFactory") JPAQueryFactory contractJpaQueryFactory,
		@Qualifier("companyJpaQueryFactory") JPAQueryFactory companyJpaQueryFactory,
		@Qualifier("storeJpaQueryFactory") JPAQueryFactory storeJpaQueryFactory
	) {
		this.paymentJpaQueryFactory = paymentJpaQueryFactory;
		this.contractJpaQueryFactory = contractJpaQueryFactory;
		this.companyJpaQueryFactory = companyJpaQueryFactory;
		this.storeJpaQueryFactory = storeJpaQueryFactory;
	}

	@Override
	public List<SettlementFindResponse> findSettlement(AuthInfo authInfo, SettlementFindRequest request) {
		Map<UUID, Map<String, UUID>> contracts = findActiveContracts(authInfo);
		List<UUID> contractIds = getContractIds(contracts);
		Map<UUID, String> partnerNameMap = getPartnerNameMap(authInfo, contractIds, contracts);
		List<PaymentMonthlySum> paymentMonthlySums = findMonthlySums(contractIds, request);
		List<SettlementFindResponse> responses = createSettlementFindResponse(authInfo, contracts,
			paymentMonthlySums, partnerNameMap);
		return responses;
	}

	@Override
	public List<PaymentMonthlySum> findPaymentMonthlySumForSettlement(UUID settlementId) {
		UUID contractId = paymentJpaQueryFactory.selectFrom(paymentMonthlySum)
			.where(paymentMonthlySum.id.eq(settlementId))
			.fetch().getFirst().getContractId();

		return paymentJpaQueryFactory
			.selectFrom(paymentMonthlySum)
			.where(paymentMonthlySum.contractId.eq(contractId))
			.orderBy(paymentMonthlySum.createdAt.desc())
			.limit(2).fetch();
	}

	private List<SettlementFindResponse> createSettlementFindResponse(AuthInfo authInfo,
		Map<UUID, Map<String, UUID>> contracts,
		List<PaymentMonthlySum> paymentMonthlySums, Map<UUID, String> partnerNameMap) {

		return paymentMonthlySums.stream()
			.map(settlementData -> {

					String taxInvoice = Optional.ofNullable(settlementData.getInvoiceId())
						.map(UUID::toString).orElse(null);

					String identifier = authInfo.getRoleType() == RoleType.COMPANY ? "storeId" : "companyId";

					UUID partnerId = contracts.get(settlementData.getContractId()).get(identifier);
					String partnerName = partnerNameMap.get(contracts.get(settlementData.getContractId()).get(identifier));

					return SettlementFindResponse.builder()
						.id(settlementData.getId())
						.partnerId(partnerId)
						.partnerName(partnerName)
						.settlementDate(settlementData.getCreatedAt())
						.settledDate(settlementData.getModifiedAt())
						.settlementAmount(settlementData.getAmount())
						.settledAmount(settlementData.getPaid())
						.receivable(settlementData.getUnpaid())
						.taxInvoice(taxInvoice)
						.build();
				}
			).collect(Collectors.toList());
	}

	private Map<UUID, String> getPartnerNameMap(AuthInfo authInfo, List<UUID> contractIds,
		Map<UUID, Map<String, UUID>> contracts) {
		return switch (authInfo.getRoleType()) {
			case COMPANY -> findStore(contractIds, contracts);
			case STORE -> findCompany(contractIds, contracts);
			default -> throw new IllegalStateException("Unexpected value: " + authInfo.getRoleType());
		};
	}

	private Map<UUID, String> findCompany(List<UUID> contractIds,
		Map<UUID, Map<String, UUID>> contracts) {

		List<UUID> companyIds = contracts.values().stream()
			.map(innerMap -> innerMap.get("companyId"))
			.collect(Collectors.toList());

		return companyJpaQueryFactory
			.select(company.id, company.companyInfo.name)
			.from(company)
			.where(company.id.in(companyIds))
			.fetch().stream()
			.collect(Collectors.toMap(
				tuple -> tuple.get(company.id),
				tuple -> Optional.ofNullable(tuple.get(company.companyInfo.name)).orElse("")
			));
	}

	private Map<UUID, String> findStore(List<UUID> contractIds,
		Map<UUID, Map<String, UUID>> contracts) {

		List<UUID> storeIds = contracts.values().stream()
			.map(innerMap -> innerMap.get("storeId"))
			.collect(Collectors.toList());

		return storeJpaQueryFactory
			.select(store.id, store.storeInfo.name)
			.from(store)
			.where(store.id.in(storeIds))
			.fetch()
			.stream()
			.collect(Collectors.toMap(
				tuple -> tuple.get(store.id),
				tuple -> Optional.ofNullable(tuple.get(store.storeInfo.name)).orElse("")
			));
	}

	private Map<UUID, Map<String, UUID>> findActiveContracts(AuthInfo authInfo) {
		return contractJpaQueryFactory
			.select(contract.id, contract.companyId, contract.storeId)
			.from(contract)
			.where(
				eqId(authInfo),
				contract.status.eq(ContractStatus.COMPLETE)
			).fetch()
			.stream().collect(Collectors.toMap(
				tuple -> tuple.get(contract.id),
				tuple -> {
					Map<String, UUID> innerMap = new HashMap<>();
					innerMap.put("companyId", tuple.get(contract.companyId));
					innerMap.put("storeId", tuple.get(contract.storeId));
					return innerMap;
				}
			));
	}

	private List<UUID> getContractIds(Map<UUID, Map<String, UUID>> contracts) {
		return new ArrayList<>(contracts.keySet());
	}

	private BooleanExpression eqId(AuthInfo authInfo) {
		return switch (authInfo.getRoleType()) {
			case COMPANY -> contract.companyId.eq(authInfo.getId());
			case STORE -> contract.storeId.eq(authInfo.getId());
			default -> throw new IllegalStateException("Unexpected value: " + authInfo.getRoleType());
		};
	}

	private List<PaymentMonthlySum> findMonthlySums(List<UUID> contractIds, SettlementFindRequest request) {
		return paymentJpaQueryFactory
			.selectFrom(paymentMonthlySum)
			.where(
				paymentMonthlySum.contractId.in(contractIds),
				paymentMonthlySum.createdAt.between(request.getStartTime(), request.getEndTime())
			)
			.fetch();
	}
}
