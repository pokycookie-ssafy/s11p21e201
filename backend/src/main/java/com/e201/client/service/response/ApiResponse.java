package com.e201.client.service.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApiResponse {
	private String version;
	private String requestId;
	private long timestamp;
	private List<Image> images;
}
