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
import com.e201.global.db.env.AdminDbProperties;

import lombok.RequiredArgsConstructor;

/**
 * datasource bean, config bean 네이밍 중복 방지를 위해 config bean 이름은 대문자로 시작
 */
@EnableConfigurationProperties({AdminDbProperties.class})
@RequiredArgsConstructor
@Configuration(value = "AdminDataSource")
public class AdminDataSource {

	private final AdminDbProperties properties;

	@Bean // TODO <jhl221123> 중복 코드 추출 필요
	public DataSource adminDataSource() {
		// Master DB 설정
		DataSource master = JtaDataSourceUtil.of(
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
		return new LazyConnectionDataSourceProxy(routingDataSource);
	}
}
