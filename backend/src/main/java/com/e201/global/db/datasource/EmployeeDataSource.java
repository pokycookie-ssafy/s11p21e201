package com.e201.global.db.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.atomikos.spring.AtomikosDataSourceBean;
import com.e201.global.db.env.EmployeeDbProperties;

import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({EmployeeDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "EmployeeDataSource")
public class EmployeeDataSource {

	private final EmployeeDbProperties employeeProperties;

	@Bean
	public DataSource employeeDataSource() {
		AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
		atomikosDataSourceBean.setXaDataSourceClassName(employeeProperties.getDriverClassName());

		Properties properties = new Properties();
		properties.setProperty("url", employeeProperties.getUrl());
		properties.setProperty("user", employeeProperties.getUsername());
		properties.setProperty("password", employeeProperties.getPassword());
		atomikosDataSourceBean.setXaProperties(properties);
		return atomikosDataSourceBean;
	}
}
