package com.e201.global.security.auth.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.e201.global.security.auth.env.PathProperties;
import com.e201.global.security.auth.filter.AuthenticationFilter;
import com.e201.global.security.auth.filter.AuthorizationFilter;
import com.e201.global.security.auth.filter.ExceptionHandlerFilter;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableConfigurationProperties({PathProperties.class})
@RequiredArgsConstructor
public class FilterConfig {

	private final PathProperties pathProperties;
	private final ObjectMapper objectMapper;

	@Bean
	public FilterRegistrationBean<Filter> exceptionHandlerFilter() {
		FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<>();
		bean.setFilter(new ExceptionHandlerFilter(objectMapper));
		bean.setOrder(1);
		return bean;
	}

	@Bean
	public FilterRegistrationBean<Filter> authenticationFilter() {
		FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<>();
		bean.setFilter(new AuthenticationFilter(pathProperties));
		bean.setOrder(2);
		return bean;
	}

	@Bean
	public FilterRegistrationBean<Filter> authorizationFilter() {
		FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<>();
		bean.setFilter(new AuthorizationFilter(pathProperties.getCreationPath()));
		bean.setOrder(3);
		return bean;
	}
}
