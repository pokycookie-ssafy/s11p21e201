package com.e201.domain.repository.payment;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.payment.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
