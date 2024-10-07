package com.e201.api.service.settlement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.e201.api.controller.settlement.request.SettlementFindRequest;
import com.e201.api.controller.settlement.request.SettlementRequest;
import com.e201.api.controller.settlement.response.SettlementFindResponse;
import com.e201.api.controller.settlement.response.SettlementResponse;
import com.e201.api.service.contract.ContractService;
import com.e201.api.service.payment.PaymentMonthlySumService;
import com.e201.client.controller.financial.request.FinDepositRequest;
import com.e201.client.service.financial.FinancialService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.CompanyAccount;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.domain.entity.store.StoreAccount;
import com.e201.domain.repository.company.CompanyAccountRepository;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.payment.PaymentMonthlySumRepository;
import com.e201.domain.repository.store.StoreAccountRepository;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.Auth;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class SettlementService {

	private final PaymentMonthlySumService paymentMonthlySumService;
	private final PaymentMonthlySumRepository paymentMonthlySumRepository;
	private final ContractService contractService;
	private final FinancialService financialService;
	private final ContractRepository contractRepository;
	private final CompanyAccountRepository companyAccountRepository;
	private final StoreAccountRepository storeAccountRepository;

	@JtaTransactional
	public List<SettlementFindResponse> find(@Auth AuthInfo authInfo, SettlementFindRequest request) {
		List<SettlementFindResponse> responses = paymentMonthlySumRepository.findSettlement(authInfo, request);
		return responses;
	}

	@JtaTransactional
	public SettlementResponse settlement(AuthInfo authInfo, SettlementRequest request) {
		// 정산 update 로직 실행.
		List<PaymentMonthlySum> monthlySum = paymentMonthlySumRepository.findPaymentMonthlySumForSettlement(
			request.getSettlementId());

		System.out.println(monthlySum.size());

		Long amount = request.getAmount();
		PaymentMonthlySum currentMonth = monthlySum.getFirst();

		if (monthlySum.size() < 2) {
			currentMonth.settlement(request.getAmount());
		} else {
			PaymentMonthlySum previousMonth = monthlySum.getLast();

			// 미수금 처리
			Long unpaid = previousMonth.getUnpaid();
			amount -= unpaid;
			previousMonth.settlementUnpaid();

			// 정산 처리
			currentMonth.settlement(amount);
		}

		// 송금
		Contract contract = contractRepository.findById(currentMonth.getContractId()).get();
		StoreAccount store = storeAccountRepository.findStoreAccountByStoreId(contract.getStoreId()).get();
		CompanyAccount company = companyAccountRepository.findCompanyAccountByCompanyId(contract.getCompanyId()).get();

		financialService.depositAccountTransfer(
			new FinDepositRequest(company.getNumber(), store.getAccountNumber(), request.getAmount()));

		return new SettlementResponse(currentMonth.getId());
	}
}
