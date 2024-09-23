package com.e201.global.auth.filter;

import static com.e201.global.security.auth.constant.AuthConstant.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpMethod.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.env.AuthWhitelistProperties;
import com.e201.global.security.auth.exception.AuthenticationException;
import com.e201.global.security.auth.filter.AuthenticationFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

class AuthenticationFilterTest {

	public static final String COMPANY_AUTH_PATH = "/companies/auth";
	public static final String MANAGER_AUTH_PATH = "/companies/managers/auth";
	public static final String EMPLOYEE_AUTH_PATH = "/companies/employees/auth";
	public static final String COMPANY_CREATE_PATH = "/companies";
	public static final String MANAGER_CREATE_PATH = "/companies/managers";
	public static final String EMPLOYEE_CREATE_PATH = "/companies/employees";

	AuthenticationFilter authenticationFilter;

	AuthWhitelistProperties authWhitelistProperties;

	FilterChain filterChain;

	@BeforeEach
	void init() {
		AuthWhitelistProperties.AuthPath authPath = createAuthPath();
		AuthWhitelistProperties.CreatePath createPath = createCreatePath();
		authWhitelistProperties = new AuthWhitelistProperties(authPath, createPath);
		authenticationFilter = new AuthenticationFilter(authWhitelistProperties);
		filterChain = Mockito.mock(FilterChain.class);
	}

	@DisplayName("화이트 리스트에 포함된 경로는 인증 필터를 통과한다.")
	@Test
	void whitelist_pass_authentication_filter() throws ServletException, IOException {
		// given
		List<String> whitelist = List.of(COMPANY_AUTH_PATH, MANAGER_AUTH_PATH, EMPLOYEE_AUTH_PATH,
			COMPANY_CREATE_PATH, MANAGER_CREATE_PATH, EMPLOYEE_CREATE_PATH
		);

		// when
		for (String uri : whitelist) {
			HttpServletRequest request = new MockHttpServletRequest(POST.name(), uri);
			HttpServletResponse response = new MockHttpServletResponse();
			authenticationFilter.doFilter(request, response, filterChain);
		}

		//then
		verify(filterChain, times(whitelist.size())).doFilter(any(), any());
	}

	@DisplayName("인증되지 않은 사용자가 인증이 필요한 경로에 접근하면 예외가 발생한다.")
	@Test
	void non_authentication_reject_access() {
		// given
		HttpServletRequest request = new MockHttpServletRequest(POST.name(), "authentication_required_path");
		HttpServletResponse response = new MockHttpServletResponse();

		// when // then
		assertThatThrownBy(() -> authenticationFilter.doFilter(request, response, filterChain))
			.isExactlyInstanceOf(AuthenticationException.class);
	}

	@DisplayName("인증된 사용자는 인증 필터를 통과한다.")
	@Test
	void pass_filter_by_authentication() throws ServletException, IOException {
		// given
		HttpServletRequest request = new MockHttpServletRequest(POST.name(), "authentication_required_path");
		AuthInfo authInfo = new AuthInfo(UUID.randomUUID(), RoleType.COMPANY);
		request.getSession().setAttribute(AUTH_INFO.name(), authInfo);
		HttpServletResponse response = new MockHttpServletResponse();

		// when
		authenticationFilter.doFilter(request, response, filterChain);

		//then
		verify(filterChain, times(1)).doFilter(any(), any());
	}

	private AuthWhitelistProperties.AuthPath createAuthPath() {
		AuthWhitelistProperties.AuthPath authPath = new AuthWhitelistProperties.AuthPath();
		authPath.setMethod(POST);
		authPath.setCompanyPath(COMPANY_AUTH_PATH);
		authPath.setManagerPath(MANAGER_AUTH_PATH);
		authPath.setEmployeePath(EMPLOYEE_AUTH_PATH);
		return authPath;
	}

	private AuthWhitelistProperties.CreatePath createCreatePath() {
		AuthWhitelistProperties.CreatePath createPath = new AuthWhitelistProperties.CreatePath();
		createPath.setMethod(POST);
		createPath.setCompanyPath(COMPANY_CREATE_PATH);
		createPath.setManagerPath(MANAGER_CREATE_PATH);
		createPath.setEmployeePath(EMPLOYEE_CREATE_PATH);
		return createPath;
	}
}