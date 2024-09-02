package com.e201.global.db.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.atomikos.spring.AtomikosDataSourceBean;
import com.e201.global.db.env.CompanyDbProperties;

import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({CompanyDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "CompanyDataSource")
public class CompanyDataSource {
	private final CompanyDbProperties companyProperties;

	@Bean
	public DataSource companyDataSource() {
		AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
		atomikosDataSourceBean.setXaDataSourceClassName(companyProperties.getDriverClassName());

		Properties properties = new Properties();
		properties.setProperty("url", companyProperties.getUrl());
		properties.setProperty("user", companyProperties.getUsername());
		properties.setProperty("password", companyProperties.getPassword());
		atomikosDataSourceBean.setXaProperties(properties);
		return atomikosDataSourceBean;
	}
}
