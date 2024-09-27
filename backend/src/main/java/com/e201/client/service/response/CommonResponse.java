package com.e201.client.service.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommonResponse {
	private String text;
	private String keyText;
	private String confidenceScore;
}
