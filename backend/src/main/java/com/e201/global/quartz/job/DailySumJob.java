package com.e201.global.quartz.job;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.e201.domain.entity.payment.PaymentDailySum;
import com.e201.domain.repository.payment.PaymentDailySumRepository;
import com.e201.domain.repository.payment.PaymentRepository;
import com.e201.global.quartz.dto.PaymentDailySumDto;
import com.e201.global.quartz.util.JobLockManager;

@Component
public class DailySumJob implements Job {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private PaymentDailySumRepository paymentDailySumRepository;

	@Override
	public void execute(JobExecutionContext context) {
		JobLockManager.lock();
		LocalDateTime startOfDay = LocalDate.now().minusDays(1).atStartOfDay();
		LocalDateTime endOfDay = LocalDate.now().minusDays(1).atTime(23, 59, 59);
		// contract_id별 합계
		List<PaymentDailySumDto> paymentDailySums = paymentRepository.sumByContractId(startOfDay, endOfDay);
		paymentDailySums.forEach(o -> {
			PaymentDailySum paymentDailySum = PaymentDailySum.builder()
				.contractId(o.getContractId())
				.amount(o.getDailySum())
				.build();
			paymentDailySumRepository.save(paymentDailySum);
		});
		JobLockManager.unlock();
	}
}

