package com.e201.api.service.payment;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.payment.PaymentDailySum;
import com.e201.domain.repository.payment.PaymentDailySumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentDailySumService {

	private final PaymentDailySumRepository paymentDailySumRepository;

	public PaymentDailySum findDomain(UUID id){
		return paymentDailySumRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
