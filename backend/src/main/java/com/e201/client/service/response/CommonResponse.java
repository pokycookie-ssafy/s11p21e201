package com.e201.client.service.response;

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
public class CommonResponse {
	private String text;
	private String keyText;
	private String confidenceScore;
}
