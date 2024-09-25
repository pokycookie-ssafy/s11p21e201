package com.e201.global.security.auth.env;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpMethod;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "e201.security.auth.filter")
public class PathProperties {

	private final AuthPath authPath;
	private final CreationPath creationPath;

	@Getter
	@Setter // TODO <jhl221123> 가능하다면 @RequiredArgsConstructor로 변경
	public static class AuthPath {
		private HttpMethod method;
		private String companyPath;
		private String managerPath;
		private String employeePath;
	}

	@Getter
	@Setter
	public static class CreationPath {
		private HttpMethod method;
		private String companyInfoPath;
		private String companyPath;
		private String managerPath;
		private String employeePath;
	}
}
