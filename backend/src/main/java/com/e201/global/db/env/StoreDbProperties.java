package com.e201.global.db.env;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "spring.datasource.jta.store")
public class StoreDbProperties {

	private final String name;
	private final String driverClassName;
	private final String url;
	private final String username;
	private final String password;
	private final Map<String, Slave> slaves;

	@Getter
	@Setter
	public static class Slave {
		private String name;
		private String driverClassName;
		private String url;
		private String username;
		private String password;
	}
}
