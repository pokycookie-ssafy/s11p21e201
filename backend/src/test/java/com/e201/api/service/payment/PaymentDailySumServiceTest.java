package com.e201.api.service.payment;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.payment.PaymentDailySum;
import com.e201.domain.repository.payment.PaymentDailySumRepository;

@SpringBootTest
public class PaymentDailySumServiceTest {

	@Autowired
	PaymentDailySumRepository paymentDailySumRepository;

	@Autowired
	PaymentDailySumService sut;

	@JtaTransactional
	@DisplayName("장부_일일 집계(Entity)를 조회한다.")
	@Test
	void find_payment_daily_sum_entity_success(){
		UUID contractId = UUID.randomUUID();

		// given
		PaymentDailySum paymentDailySum = createPaymentDailySum(contractId, 1000);
		paymentDailySumRepository.save(paymentDailySum);

		// when
		PaymentDailySum actual = sut.findDomain(paymentDailySum.getId());

		// then
		assertThat(actual.getAmount()).isEqualTo(1000);
	}

	@DisplayName("존재하지 않는 장부_일일집계(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_payment_daily_sum_entity_fail(){
		assertThatThrownBy(() -> sut.findDomain(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

	private PaymentDailySum createPaymentDailySum(UUID contractId, int amount) {
		return PaymentDailySum.builder()
			.contractId(contractId)
			.amount(amount)
			.build();
	}
}
