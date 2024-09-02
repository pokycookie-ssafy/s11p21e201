package com.e201.global.db.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.atomikos.spring.AtomikosDataSourceBean;
import com.e201.global.db.env.PaymentDbProperties;
import com.e201.global.db.env.StoreDbProperties;

import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({PaymentDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "PaymentDataSource")
public class PaymentDataSource {
	private final PaymentDbProperties paymentProperties;

	@Bean
	public DataSource paymentDataSource() {
		AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
		atomikosDataSourceBean.setXaDataSourceClassName(paymentProperties.getDriverClassName());

		Properties properties = new Properties();
		properties.setProperty("url", paymentProperties.getUrl());
		properties.setProperty("user", paymentProperties.getUsername());
		properties.setProperty("password", paymentProperties.getPassword());
		atomikosDataSourceBean.setXaProperties(properties);
		return atomikosDataSourceBean;
	}
}
