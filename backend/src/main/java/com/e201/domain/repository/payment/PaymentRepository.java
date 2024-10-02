package com.e201.domain.repository.payment;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.payment.Payment;

public interface PaymentRepository extends JpaRepository<Payment, UUID>, PaymentRepositoryCustom {
	
}
