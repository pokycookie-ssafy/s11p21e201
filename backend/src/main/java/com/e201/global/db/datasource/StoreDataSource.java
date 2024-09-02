package com.e201.global.db.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.atomikos.spring.AtomikosDataSourceBean;
import com.e201.global.db.env.EmployeeDbProperties;
import com.e201.global.db.env.StoreDbProperties;

import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({StoreDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "StoreDataSource")
public class StoreDataSource {
	private final StoreDbProperties storeProperties;

	@Bean
	public DataSource storeDataSource() {
		AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
		atomikosDataSourceBean.setXaDataSourceClassName(storeProperties.getDriverClassName());

		Properties properties = new Properties();
		properties.setProperty("url", storeProperties.getUrl());
		properties.setProperty("user", storeProperties.getUsername());
		properties.setProperty("password", storeProperties.getPassword());
		atomikosDataSourceBean.setXaProperties(properties);
		return atomikosDataSourceBean;
	}
}
