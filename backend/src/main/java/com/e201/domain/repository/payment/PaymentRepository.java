package com.e201.domain.repository.payment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e201.domain.entity.payment.Payment;
import com.e201.global.quartz.dto.PaymentDailySumDto;

public interface PaymentRepository extends JpaRepository<Payment, UUID>, PaymentRepositoryCustom {

	@Query("select new com.e201.global.quartz.dto.PaymentDailySumDto(p.contractId, SUM(p.amount)) " +
		"from Payment p where p.createdAt between :startDate and :endDate group by p.contractId")
	List<PaymentDailySumDto> sumByContractId(LocalDateTime startDate, LocalDateTime endDate);
}
