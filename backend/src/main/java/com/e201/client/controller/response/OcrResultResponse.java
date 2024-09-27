package com.e201.client.controller.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OcrResultResponse {

	private String representationName;
	private String companyName;
	private String registerNumber;
	private String openDate;
	private String bisType;
	private String bisItem;
	private String bisAddress;

}
