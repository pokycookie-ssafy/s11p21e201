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
		private String storePath;
	}

	@Getter
	@Setter
	public static class CreationPath {
		private HttpMethod method;
		private String companyInfoPath;
		private String companyPath;
		private String managerPath;
		private String employeePath;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		private String storePath;
=======
>>>>>>> be93cfb ([#25] feat: Auth filer에 사업자 등록증 api 등록)
=======
>>>>>>> 4608df5 ([#25] feat: Auth filer에 사업자 등록증 api 등록)
=======
		private String storePath;
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
		private String licensePath;
		private String finPath;
	}
}
