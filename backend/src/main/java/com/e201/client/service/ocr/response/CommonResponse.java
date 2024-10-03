package com.e201.client.service.ocr.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponse {
	private String text;
	private String keyText;
	private String confidenceScore;
}
