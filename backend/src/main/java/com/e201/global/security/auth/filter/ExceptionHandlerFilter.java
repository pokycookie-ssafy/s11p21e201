package com.e201.global.security.auth.filter;

import static org.springframework.http.MediaType.*;

import java.io.IOException;

import com.e201.global.exception.BusinessException;
import com.e201.global.exception.ErrorResponse;
import com.e201.global.security.auth.exception.AuthenticationException;
import com.e201.global.security.auth.exception.AuthorizationException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class ExceptionHandlerFilter implements Filter {

	private final ObjectMapper objectMapper;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException, ServletException {
		try {
			chain.doFilter(request, response);
		} catch (AuthenticationException | AuthorizationException e) {
			ErrorResponse errorResponse = createErrorResponse(response, e);
			writeResponse(response, errorResponse);
		} catch (Exception e) {
			log.warn(e.getMessage(), e);
			throw e;
		}
	}

	private ErrorResponse createErrorResponse(ServletResponse response, BusinessException e) {
		HttpServletResponse httpResponse = (HttpServletResponse)response;
		httpResponse.setStatus(e.getErrorCode().getStatus());
		response.setContentType(APPLICATION_JSON_VALUE);
		return new ErrorResponse(e.getErrorCode(), e.getMessage());
	}

	private void writeResponse(ServletResponse response, ErrorResponse errorResponse) {
		try {
			response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
		} catch (IOException ioException) {
			log.warn(ioException.getMessage(), ioException);
		}
	}
}
