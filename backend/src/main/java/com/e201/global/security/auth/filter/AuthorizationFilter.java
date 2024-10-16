package com.e201.global.security.auth.filter;

import static com.e201.global.exception.ErrorCode.*;
import static com.e201.global.security.auth.constant.AuthConstant.*;
import static com.e201.global.security.auth.constant.RoleType.*;
import static org.springframework.http.HttpMethod.*;

import java.io.IOException;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpMethod;
import org.springframework.util.PatternMatchUtils;

import com.e201.global.exception.ErrorCode;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.env.PathProperties;
import com.e201.global.security.auth.exception.AuthorizationException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthorizationFilter implements Filter {

	private final PathProperties.CreationPath creationPath;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
			chain.doFilter(request, response);
			return;
		}
		boolean isManagerCreationPath = matchURIAndMethod(httpRequest, POST, creationPath.getManagerPath());
		boolean isEmployeeCreationPath = matchURIAndMethod(httpRequest, POST, creationPath.getEmployeePath());
		if(isManagerCreationPath || isEmployeeCreationPath) {
			validate(httpRequest, isManagerCreationPath, isEmployeeCreationPath);
		}
		chain.doFilter(request, response);
	}

	private void validate(HttpServletRequest request, boolean isManagerCreationPath, boolean isEmployeeCreationPath) {
		HttpSession session = request.getSession(false);
		AuthInfo authInfo = getAuthInfo(session);
		if(isManagerCreationPath && authInfo.getRoleType() != COMPANY) {
			throw new AuthorizationException(AUTHORIZATION_FAILED, "only company has access");
		} else if(isEmployeeCreationPath && authInfo.getRoleType() != MANAGER) {
			throw new AuthorizationException(AUTHORIZATION_FAILED, "only manager has access");
		}
	}

	private AuthInfo getAuthInfo(HttpSession session) {
		AuthInfo authInfo = null;
		if(session.getAttribute(AUTH_INFO.name()) instanceof AuthInfo) {
			authInfo = (AuthInfo)session.getAttribute(AUTH_INFO.name());
		}
		return authInfo;
	}

	private boolean matchURIAndMethod(HttpServletRequest request, HttpMethod httpMethod, String pattern) {
		boolean isMatchedURI = PatternMatchUtils.simpleMatch(pattern, request.getRequestURI());
		boolean isMatchedMethod = request.getMethod().equals(httpMethod.name());
		return isMatchedURI && isMatchedMethod;
	}
}
