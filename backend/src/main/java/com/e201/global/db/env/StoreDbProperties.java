package com.e201.global.db.env;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "spring.datasource.jta.store")
public class StoreDbProperties {

	private final String driverClassName;
	private final String url;
	private final String username;
	private final String password;
}
