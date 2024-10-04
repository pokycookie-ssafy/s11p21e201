package com.e201.domain.repository.payment;

import java.util.List;
import java.util.UUID;

import com.e201.api.controller.settlement.request.SettlementFindRequest;
import com.e201.api.controller.settlement.response.SettlementFindResponse;
import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.global.security.auth.dto.AuthInfo;

public interface PaymentMonthlySumCustomRepository {
	List<SettlementFindResponse> findSettlement(AuthInfo authInfo, SettlementFindRequest request);

	List<PaymentMonthlySum> findPaymentMonthlySumForSettlement(UUID contractId);
}
