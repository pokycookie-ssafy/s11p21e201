package com.e201.client.service.response;

import java.util.List;

<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
=======
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
public class ApiResponse {
	private String version;
	private String requestId;
	private long timestamp;
	private List<Image> images;
}
