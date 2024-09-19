package com.e201.api.service.payment;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.domain.repository.payment.PaymentMonthlySumRepository;

@SpringBootTest
public class PaymentMonthlySumServiceTest {

	@Autowired
	PaymentMonthlySumService sut;

	@Autowired
	private PaymentMonthlySumRepository paymentMonthlySumRepository;

	@JtaTransactional
	@DisplayName("장부_월별집계(Entity)를 조회한다.")
	@Test
	void find_payment_monthly_sum_entity_success(){
		UUID contractId = UUID.randomUUID();
		// given
		PaymentMonthlySum paymentMonthlySum = createPaymentMonthlySum(contractId, 10000L, 5000L, 5000L);
		paymentMonthlySumRepository.save(paymentMonthlySum);

		// when
		PaymentMonthlySum actual = sut.findDomain(paymentMonthlySum.getId());
		
		// then
		assertThatPaymentMonthlyMatchExactly(actual, contractId, 10000L, 5000L, 5000L);
	}

	@DisplayName("존재하지 않는 장부_월별집계(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_payment_monthly_sum_entity_fail(){
		assertThatThrownBy(() -> sut.findDomain(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	private PaymentMonthlySum createPaymentMonthlySum(UUID contractId, Long amount, Long paid, Long receivable) {
		return PaymentMonthlySum.builder()
			.contractId(contractId)
			.amount(amount)
			.paid(paid)
			.receivable(receivable)
			.build();
	}

	private void assertThatPaymentMonthlyMatchExactly(PaymentMonthlySum paymentMonthlySum, UUID contractId, Long amount, Long paid, Long receivable) {
		assertThat(paymentMonthlySum)
			.extracting("contractId", "amount", "paid", "receivable")
			.containsExactly(contractId, amount, paid, receivable);
	}
}
