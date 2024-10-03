package com.e201.client.service.ocr.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Result {
	private List<CommonResponse> repName; // 대표자명
	private List<CommonResponse> companyName;// 상호명
	private List<CommonResponse> registerNumber;// 사업자등록번호
	private List<CommonResponse> corpName; // 법인(기업)명
	private List<CommonResponse> corpRegisterNum; // 법인 사업자등록번호
	private List<CommonResponse> openDate;// 개업연원일
	private List<CommonResponse> bisType;// 업종
	private List<CommonResponse> bisItem;// 종목
	private List<CommonResponse> bisAddress;// 사업장 소새지
	private List<CommonResponse> taxType; // 법입 or 개인사업자
}
