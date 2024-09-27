package com.e201.client.service.response;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Image {
	private String uid;
	private String name;
	private String inferResult;
	private String message;
	private Map<String, String> validationResult;
	private BizLicense bizLicense;
}
