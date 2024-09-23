package com.e201.global.security.auth.filter;

import java.io.IOException;

import com.e201.global.security.auth.exception.AuthenticationException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class ExceptionHandlerFilter implements Filter {
	private final ObjectMapper objectMapper;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {
		try {
			chain.doFilter(request, response);
		} catch (AuthenticationException e) {
			// TODO <jhl221123> 예외 공통 처리
			log.info("Authentication exception", e);
		} catch (Exception e) {
			log.warn(e.getMessage(), e);
			throw e;
		}
	}
}
