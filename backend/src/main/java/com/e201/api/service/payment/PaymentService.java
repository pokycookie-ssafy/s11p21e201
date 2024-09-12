package com.e201.api.service.payment;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.payment.Payment;
import com.e201.domain.repository.payment.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

	private final PaymentRepository paymentRepository;

	public Payment findDomain(UUID id){
		return paymentRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
