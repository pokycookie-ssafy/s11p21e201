package com.e201.client.service.response;

import java.util.Map;

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
public class Image {
	private String uid;
	private String name;
	private String inferResult;
	private String message;
	private Map<String, String> validationResult;
	private BizLicense bizLicense;
}
