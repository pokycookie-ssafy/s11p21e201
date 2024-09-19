package com.e201.domain.repository.payment;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.payment.PaymentMonthlySum;

public interface PaymentMonthlySumRepository extends JpaRepository<PaymentMonthlySum, UUID> {
}
