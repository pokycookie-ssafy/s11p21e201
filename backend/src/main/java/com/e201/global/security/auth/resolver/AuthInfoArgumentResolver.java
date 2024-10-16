package com.e201.global.security.auth.resolver;

import static com.e201.global.security.auth.constant.AuthConstant.*;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.e201.global.security.auth.dto.AuthInfo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Component
public class AuthInfoArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		boolean hasAuthAnnotation = parameter.hasParameterAnnotation(Auth.class);
		boolean hasAuthInfoType = parameter.getParameterType().isAssignableFrom(AuthInfo.class);
		return hasAuthAnnotation && hasAuthInfoType;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
		HttpServletRequest request = (HttpServletRequest)webRequest.getNativeRequest();
		HttpSession session = request.getSession(false);
		return session.getAttribute(AUTH_INFO.name());
	}
}
