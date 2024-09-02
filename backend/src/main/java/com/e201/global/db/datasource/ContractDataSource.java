package com.e201.global.db.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.atomikos.spring.AtomikosDataSourceBean;
import com.e201.global.db.env.ContractDbProperties;

import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({ContractDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "ContractDataSource")
public class ContractDataSource {
	private final ContractDbProperties contractProperties;

	@Bean
	public DataSource contractDataSource() {
		AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
		atomikosDataSourceBean.setXaDataSourceClassName(contractProperties.getDriverClassName());

		Properties properties = new Properties();
		properties.setProperty("url", contractProperties.getUrl());
		properties.setProperty("user", contractProperties.getUsername());
		properties.setProperty("password", contractProperties.getPassword());
		atomikosDataSourceBean.setXaProperties(properties);
		return atomikosDataSourceBean;
	}
}
