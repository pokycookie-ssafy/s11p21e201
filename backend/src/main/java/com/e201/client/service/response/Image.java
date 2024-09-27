package com.e201.client.service.response;

import java.util.Map;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
=======
import lombok.Builder;
=======
import lombok.AllArgsConstructor;
>>>>>>> be93cfb ([#25] feat: Auth filer에 사업자 등록증 api 등록)
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
<<<<<<< HEAD
@Builder
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> be93cfb ([#25] feat: Auth filer에 사업자 등록증 api 등록)
=======
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
public class Image {
	private String uid;
	private String name;
	private String inferResult;
	private String message;
	private Map<String, String> validationResult;
	private BizLicense bizLicense;
}
