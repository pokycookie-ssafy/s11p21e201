package com.e201.client.service.response;

import java.util.List;

<<<<<<< HEAD
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
public class Result {
	private List<CommonResponse> repName; // 대표자명
	private List<CommonResponse> companyName;// 상호명
	private List<CommonResponse> registerNumber;// 사업자등록번호
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
	private List<CommonResponse> openDate;// 개업연원일
	private List<CommonResponse> bisType;// 업종
	private List<CommonResponse> bisItem;// 종목
	private List<CommonResponse> bisAddress;// 사업장 소새지
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
}
