package com.e201.client.service.ocr.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
	private String version;
	private String requestId;
	private long timestamp;
	private List<Image> images;
}
