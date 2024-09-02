package com.e201.global.db.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.jta.JtaTransactionManager;

import com.atomikos.icatch.jta.UserTransactionImp;
import com.atomikos.icatch.jta.UserTransactionManager;

import jakarta.transaction.TransactionManager;
import jakarta.transaction.UserTransaction;

@Configuration
@EnableTransactionManagement
public class JtaConfig {

	@Bean
	public UserTransaction userTransaction() throws Throwable {
		UserTransactionImp userTransactionImp = new UserTransactionImp();
		userTransactionImp.setTransactionTimeout(10000);

		return userTransactionImp;
	}

	@Bean
	public TransactionManager atomikosTransactionManager() {
		UserTransactionManager userTransactionManager = new UserTransactionManager();
		userTransactionManager.setForceShutdown(false);

		return userTransactionManager;
	}

	@Bean
	public PlatformTransactionManager jtaTransactionManager(UserTransaction userTransaction,
		TransactionManager atomikosTransactionManager) {
		return new JtaTransactionManager(userTransaction, atomikosTransactionManager);
	}
}
