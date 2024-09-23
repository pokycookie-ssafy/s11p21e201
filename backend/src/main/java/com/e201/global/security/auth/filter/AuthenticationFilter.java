package com.e201.global.security.auth.filter;

import static com.e201.global.security.auth.constant.AuthConstant.*;

import java.io.IOException;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpMethod;
import org.springframework.util.PatternMatchUtils;

import com.e201.global.security.auth.env.AuthWhitelistProperties;
import com.e201.global.security.auth.exception.AuthenticationException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@EnableConfigurationProperties({AuthWhitelistProperties.class})
@RequiredArgsConstructor
public class AuthenticationFilter implements Filter {

	private final AuthWhitelistProperties authWhitelistProperties;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		HttpSession session = httpRequest.getSession(false);
		authenticate(httpRequest, session);
		chain.doFilter(request, response);
	}

	private void authenticate(HttpServletRequest httpRequest, HttpSession session) {
		if (isAuthenticationRequired(httpRequest)) {
			if (session == null || session.getAttribute(AUTH_INFO.name()) == null) {
				throw new AuthenticationException("authentication is failed");
			}
		}
	}

	private boolean isAuthenticationRequired(HttpServletRequest request) {
		AuthWhitelistProperties.AuthPath authPath = authWhitelistProperties.getAuthPath();
		AuthWhitelistProperties.CreatePath createPath = authWhitelistProperties.getCreatePath();
		boolean isAuthPath = isAuthPath(request, authPath);
		boolean isCreatePath = isCreatePath(request, createPath);
		return !(isAuthPath || isCreatePath);
	}

	private boolean isAuthPath(HttpServletRequest request, AuthWhitelistProperties.AuthPath authPath) {
		boolean isCompanyAuthPath = matchURIAndMethod(request, authPath.getMethod(), authPath.getCompanyPath());
		boolean isManagerAuthPath = matchURIAndMethod(request, authPath.getMethod(), authPath.getManagerPath());
		boolean isEmployeeAuthPath = matchURIAndMethod(request, authPath.getMethod(), authPath.getEmployeePath());
		return isCompanyAuthPath || isManagerAuthPath || isEmployeeAuthPath;
	}

	private boolean isCreatePath(HttpServletRequest request, AuthWhitelistProperties.CreatePath createPath) {
		boolean isCompanyCreatePath = matchURIAndMethod(request, createPath.getMethod(), createPath.getCompanyPath());
		boolean isManagerCreatePath = matchURIAndMethod(request, createPath.getMethod(), createPath.getManagerPath());
		boolean isEmployeeCreatePath = matchURIAndMethod(request, createPath.getMethod(), createPath.getEmployeePath());
		return isCompanyCreatePath || isManagerCreatePath || isEmployeeCreatePath;
	}

	private boolean matchURIAndMethod(HttpServletRequest request, HttpMethod httpMethod, String pattern) {
		boolean isMatchedURI = PatternMatchUtils.simpleMatch(pattern, request.getRequestURI());
		boolean isMatchedMethod = request.getMethod().equals(httpMethod.name());
		return isMatchedURI && isMatchedMethod;
	}
}
