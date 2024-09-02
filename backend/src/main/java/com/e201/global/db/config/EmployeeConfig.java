package com.e201.global.db.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.hibernate.engine.transaction.jta.platform.internal.AtomikosJtaPlatform;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.e201.domain.repository.employee",
	entityManagerFactoryRef = "employeeEntityManagerFactory",
	transactionManagerRef = "jtaTransactionManager")
public class EmployeeConfig {

	@Bean
	public LocalContainerEntityManagerFactoryBean employeeEntityManagerFactory(DataSource employeeDataSource) {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(employeeDataSource);
		em.setPackagesToScan("com.e201.domain.entity.employee");

		Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", "create-drop");
		properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
		properties.setProperty("hibernate.transaction.jta.platform", AtomikosJtaPlatform.class.getName());
		properties.setProperty("javax.persistence.transactionType", "JTA");

		JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdapter);
		em.setJpaProperties(properties);

		return em;
	}
}
