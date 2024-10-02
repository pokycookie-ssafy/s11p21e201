package com.e201.global.security.auth.filter;

import static com.e201.global.exception.ErrorCode.*;
import static com.e201.global.security.auth.constant.AuthConstant.*;

import java.io.IOException;

import org.springframework.http.HttpMethod;
import org.springframework.util.PatternMatchUtils;

import com.e201.global.security.auth.env.PathProperties;
import com.e201.global.security.auth.exception.AuthenticationException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthenticationFilter implements Filter {

	private final PathProperties pathProperties;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;

		if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
			chain.doFilter(request, response);
			return;
		}

		HttpSession session = httpRequest.getSession(false);
		authenticate(httpRequest, session);
		chain.doFilter(request, response);
	}

	private void authenticate(HttpServletRequest httpRequest, HttpSession session) {
		if (isAuthenticationRequired(httpRequest)) {
			if (session == null || session.getAttribute(AUTH_INFO.name()) == null) {
				throw new AuthenticationException(AUTHENTICATION_FAILED, "do not exist authentication info");
			}
		}
	}

	private boolean isAuthenticationRequired(HttpServletRequest request) {
		PathProperties.AuthPath authPath = pathProperties.getAuthPath();
		PathProperties.CreationPath creationPath = pathProperties.getCreationPath();
		boolean isAuthPath = isAuthPath(request, authPath);
		boolean isCreatePath = isCreatePath(request, creationPath);
		return !(isAuthPath || isCreatePath);
	}

	private boolean isAuthPath(HttpServletRequest request, PathProperties.AuthPath authPath) {
		HttpMethod method = authPath.getMethod();
		boolean isCompanyAuthPath = matchURIAndMethod(request, method, authPath.getCompanyPath());
		boolean isManagerAuthPath = matchURIAndMethod(request, method, authPath.getManagerPath());
		boolean isEmployeeAuthPath = matchURIAndMethod(request, method, authPath.getEmployeePath());
		boolean isStoreAuthPath = matchURIAndMethod(request, method, authPath.getStorePath());
		return isCompanyAuthPath || isManagerAuthPath || isEmployeeAuthPath || isStoreAuthPath;
	}

	private boolean isCreatePath(HttpServletRequest request, PathProperties.CreationPath creationPath) {
		HttpMethod method = creationPath.getMethod();
		boolean isCompanyInfoCreatePath = matchURIAndMethod(request, method, creationPath.getCompanyInfoPath());
		boolean isCompanyCreatePath = matchURIAndMethod(request, method, creationPath.getCompanyPath());
		boolean isManagerCreatePath = matchURIAndMethod(request, method, creationPath.getManagerPath());
		boolean isEmployeeCreatePath = matchURIAndMethod(request, method, creationPath.getEmployeePath());
		boolean isStoreCreatePath = matchURIAndMethod(request, method, creationPath.getStorePath());
		boolean isLicenseCreatePath = matchURIAndMethod(request, method, creationPath.getLicensePath());
		return isCompanyInfoCreatePath || isCompanyCreatePath || isManagerCreatePath || isEmployeeCreatePath
			|| isStoreCreatePath || isLicenseCreatePath;
	}

	private boolean matchURIAndMethod(HttpServletRequest request, HttpMethod httpMethod, String pattern) {
		boolean isMatchedURI = PatternMatchUtils.simpleMatch(pattern, request.getRequestURI());
		boolean isMatchedMethod = request.getMethod().equals(httpMethod.name());
		return isMatchedURI && isMatchedMethod;
	}
}
