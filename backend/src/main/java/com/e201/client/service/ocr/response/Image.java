package com.e201.client.service.ocr.response;

import java.util.Map;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dc09338 ([#41] feat: 싸피 금융망 API 연동완료)
=======
>>>>>>> f370cc1 ([#41] feat: 싸피 금융망 API 연동완료)
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import lombok.AllArgsConstructor;
>>>>>>> 4608df5 ([#25] feat: Auth filer에 사업자 등록증 api 등록)
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
<<<<<<< HEAD
@Builder
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> 4608df5 ([#25] feat: Auth filer에 사업자 등록증 api 등록)
=======
>>>>>>> dc09338 ([#41] feat: 싸피 금융망 API 연동완료)
=======
>>>>>>> f370cc1 ([#41] feat: 싸피 금융망 API 연동완료)
=======
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
public class Image {
	private String uid;
	private String name;
	private String inferResult;
	private String message;
	private Map<String, String> validationResult;
	private BizLicense bizLicense;
}
