package com.e201.api.service.payment;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.domain.repository.payment.PaymentMonthlySumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentMonthlySumService {

	private final PaymentMonthlySumRepository paymentMonthlySumRepository;

	public PaymentMonthlySum findDomain(UUID id){
		return paymentMonthlySumRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception."));
	}
}
