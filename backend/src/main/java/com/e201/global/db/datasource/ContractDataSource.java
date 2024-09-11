package com.e201.global.db.datasource;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

import com.atomikos.spring.AtomikosDataSourceBean;
import com.e201.global.db.env.ContractDbProperties;

import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({ContractDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "ContractDataSource")
public class ContractDataSource {
	private final ContractDbProperties properties;

	@Bean
	public DataSource contractDataSource() {
		return new LazyConnectionDataSourceProxy(contractRoutingDataSource());
	}

	@Bean
	public DataSource contractRoutingDataSource() {
		// Master DB 설정
		DataSource master = JtaDataSourceUtil.of(
			properties.getName(),
			properties.getDriverClassName(),
			properties.getUrl(),
			properties.getUsername(),
			properties.getPassword()
		);

		// Slave DB 설정
		Map<Object, Object> dataSourceMap = new LinkedHashMap<>();
		dataSourceMap.put("master", master);
		properties.getSlaves().forEach((key, value) -> {
			DataSource slave = JtaDataSourceUtil.of(
				value.getName(),
				value.getDriverClassName(),
				value.getUrl(),
				value.getUsername(),
				value.getPassword()
			);
			dataSourceMap.put(value.getName(), slave);
		});

		ReplicationRoutingDataSource routingDataSource = new ReplicationRoutingDataSource();
		routingDataSource.setDefaultTargetDataSource(master);
		routingDataSource.setTargetDataSources(dataSourceMap);
		return routingDataSource;
	}
}
