package com.e201.global.quartz.config;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.e201.global.quartz.job.DailySumJob;
import com.e201.global.quartz.job.MonthlySumJob;

@Configuration
public class QuartzConfig {

	@Bean
	public JobDetail dailySumJobDetail() {
		return JobBuilder.newJob(DailySumJob.class)
			.withIdentity("dailySumJob")
			.storeDurably()
			.build();
	}

	@Bean
	public Trigger dailySumTrigger() {
		return TriggerBuilder.newTrigger()
			.forJob(dailySumJobDetail())
			.withIdentity("dailySumTrigger")
			.withSchedule(CronScheduleBuilder.dailyAtHourAndMinute(0, 0))
			.withPriority(2)
			.build();
	}

	@Bean
	public JobDetail monthlySumJobDetail() {
		return JobBuilder.newJob(MonthlySumJob.class)
			.withIdentity("monthlySumJob")
			.storeDurably()
			.build();
	}

	@Bean
	public Trigger monthlySumTrigger() {
		return TriggerBuilder.newTrigger()
			.forJob(monthlySumJobDetail())
			.withIdentity("monthlySumTrigger")
			.withSchedule(CronScheduleBuilder.dailyAtHourAndMinute(0, 0))
			.withPriority(1)
			.build();
	}
}
