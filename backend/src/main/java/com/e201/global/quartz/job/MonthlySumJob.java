package com.e201.global.quartz.job;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.payment.PaymentDailySumRepository;
import com.e201.domain.repository.payment.PaymentMonthlySumRepository;
import com.e201.global.quartz.dto.PaymentMonthlySumDto;
import com.e201.global.quartz.util.JobLockManager;

@Component
public class MonthlySumJob implements Job {

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private PaymentDailySumRepository paymentDailySumRepository;

	@Autowired
	private PaymentMonthlySumRepository paymentMonthlySumRepository;

	@Override
	public void execute(JobExecutionContext context) {
		JobLockManager.lock();
		LocalDateTime today = LocalDate.now().atStartOfDay();
		List<Contract> contracts = contractRepository.findBySettlementDay(today.getDayOfMonth());

		contracts.forEach(contract -> {
			LocalDateTime startOfMonth = today.minusMonths(1).plusDays(1);
			LocalDateTime endOfMonth = today.plusDays(1);
			Optional<PaymentMonthlySumDto> monthlySum = paymentDailySumRepository.findByContractId(contract.getId(),
				startOfMonth, endOfMonth);
			monthlySum.ifPresent(paymentMonthlySumDto -> paymentMonthlySumRepository.save(
				PaymentMonthlySum.builder()
					.contractId(contract.getId())
					.amount(paymentMonthlySumDto.getMonthlySum())
					.paid(0L)
					.unpaid(paymentMonthlySumDto.getMonthlySum())
					.build()
			));
		});
		JobLockManager.unlock();
	}
}
