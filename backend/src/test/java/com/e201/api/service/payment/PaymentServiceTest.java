package com.e201.api.service.payment;

import static org.assertj.core.api.Assertions.*;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.payment.Payment;
import com.e201.domain.repository.payment.PaymentRepository;

@SpringBootTest
public class PaymentServiceTest {

	@Autowired
	PaymentRepository paymentRepository;

	@Autowired
	PaymentService sut;

	@JtaTransactional
	@DisplayName("장부(Entity)를 조회한다.")
	@Test
	void find_payment_entity_success() {
		UUID contractId = UUID.randomUUID();
		UUID employeeId = UUID.randomUUID();
		// given
		Payment payment = createPayment(contractId, employeeId, 1000L);
		paymentRepository.save(payment);

		// when
		Payment actual = sut.findEntity(payment.getId());

		// then
		assertThat(actual.getTotalAmount()).isEqualTo(1000L);
	}

	@DisplayName("존재하지 않는 장부(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_payment_entity_fail() {
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

	private Payment createPayment(UUID contractId, UUID employeeId, Long totalAmount) {
		return Payment.builder()
			.contractId(contractId)
			.employeeId(employeeId)
			.totalAmount(totalAmount)
			.build();
	}
}
