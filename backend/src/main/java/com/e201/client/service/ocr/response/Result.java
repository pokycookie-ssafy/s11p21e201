package com.e201.client.service.ocr.response;

import java.util.List;

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
public class Result {
	private List<CommonResponse> repName; // 대표자명
	private List<CommonResponse> companyName;// 상호명
	private List<CommonResponse> registerNumber;// 사업자등록번호
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	private List<CommonResponse> corpName; // 법인(기업)명
	private List<CommonResponse> corpRegisterNum; // 법인 사업자등록번호
=======
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
	private List<CommonResponse> corpName; // 법인(기업)명
	private List<CommonResponse> corpRegisterNum; // 법인 사업자등록번호
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
=======
	private List<CommonResponse> corpName; // 법인(기업)명
	private List<CommonResponse> corpRegisterNum; // 법인 사업자등록번호
>>>>>>> dc09338 ([#41] feat: 싸피 금융망 API 연동완료)
=======
	private List<CommonResponse> corpName; // 법인(기업)명
	private List<CommonResponse> corpRegisterNum; // 법인 사업자등록번호
>>>>>>> f370cc1 ([#41] feat: 싸피 금융망 API 연동완료)
=======
	private List<CommonResponse> corpName; // 법인(기업)명
	private List<CommonResponse> corpRegisterNum; // 법인 사업자등록번호
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
	private List<CommonResponse> openDate;// 개업연원일
	private List<CommonResponse> bisType;// 업종
	private List<CommonResponse> bisItem;// 종목
	private List<CommonResponse> bisAddress;// 사업장 소새지
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	private List<CommonResponse> taxType; // 법입 or 개인사업자
=======
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
	private List<CommonResponse> taxType; // 법입 or 개인사업자
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
=======
	private List<CommonResponse> taxType; // 법입 or 개인사업자
>>>>>>> dc09338 ([#41] feat: 싸피 금융망 API 연동완료)
=======
	private List<CommonResponse> taxType; // 법입 or 개인사업자
>>>>>>> f370cc1 ([#41] feat: 싸피 금융망 API 연동완료)
=======
	private List<CommonResponse> taxType; // 법입 or 개인사업자
>>>>>>> 0de46e05944cf4306bb967ec34570e374df4dd85
}
