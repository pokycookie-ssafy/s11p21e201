package com.e201.global.auth.resolver;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.core.MethodParameter;

import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.auth.resolver.AuthInfoArgumentResolver;

class AuthInfoArgumentResolverTest {

	AuthInfoArgumentResolver sut = new AuthInfoArgumentResolver();

	@DisplayName("어노테이션과 파라미터 타입이 AuthInfoArgumentResolver 조건에 일치한다.")
	@Test
	void equal_annotation_and_parameter() {
		// given
		MethodParameter param = Mockito.mock(MethodParameter.class);
		doReturn(true).when(param).hasParameterAnnotation(any());
		doReturn(AuthInfo.class).when(param).getParameterType();

		// when
		boolean actual = sut.supportsParameter(param);

		//then
		assertThat(actual).isTrue();
	}

	@DisplayName("어노테이션이 AuthInfoArgumentResolver 조건에 일치하지 않는다.")
	@Test
	void not_equal_annotation() {
		// given
		MethodParameter param = Mockito.mock(MethodParameter.class);
		doReturn(false).when(param).hasParameterAnnotation(any());
		doReturn(AuthInfo.class).when(param).getParameterType();

		// when
		boolean actual = sut.supportsParameter(param);

		//then
		assertThat(actual).isFalse();
	}

	@DisplayName("파라미터가 AuthInfoArgumentResolver 조건에 일치하지 않는다.")
	@Test
	void not_equal_parameter() {
		// given
		MethodParameter param = Mockito.mock(MethodParameter.class);
		doReturn(true).when(param).hasParameterAnnotation(any());
		doReturn(Mockito.class).when(param).getParameterType();

		// when
		boolean actual = sut.supportsParameter(param);

		//then
		assertThat(actual).isFalse();
	}

	@DisplayName("어노테이션과 파라미터 모두 AuthInfoArgumentResolver 조건에 일치하지 않는다.")
	@Test
	void not_equal_annotation_parameter() {
		// given
		MethodParameter param = Mockito.mock(MethodParameter.class);
		doReturn(false).when(param).hasParameterAnnotation(any());
		doReturn(Mockito.class).when(param).getParameterType();

		// when
		boolean actual = sut.supportsParameter(param);

		//then
		assertThat(actual).isFalse();
	}
}