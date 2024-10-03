package com.e201.domain.repository.payment;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e201.domain.entity.payment.PaymentDailySum;
import com.e201.global.quartz.dto.PaymentMonthlySumDto;

public interface PaymentDailySumRepository extends JpaRepository<PaymentDailySum, UUID> {

	@Query("select new com.e201.global.quartz.dto.PaymentMonthlySumDto(p.contractId, SUM(p.amount)) " +
		"from PaymentDailySum p where p.contractId = :contractId and p.createdAt between :startDate and :endDate group by p.contractId")
	Optional<PaymentMonthlySumDto> findByContractId(UUID contractId, LocalDateTime startDate, LocalDateTime endDate);
}
