package com.e201.client.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.api.service.company.CompanyService;
import com.e201.api.service.store.StoreService;
import com.e201.client.controller.response.LicenseCreateResponse;
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
import com.e201.client.controller.response.OcrResultResponse;
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
import com.e201.api.service.company.CompanyService;
import com.e201.api.service.store.StoreService;
import com.e201.client.controller.response.LicenseCreateResponse;
import com.e201.client.controller.response.LicenseReadResponse;
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
import com.e201.client.service.response.ApiResponse;
import com.e201.client.service.response.Result;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OcrService {
	private final RestClient restClient;
	private final ObjectMapper mapper = new ObjectMapper();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
	private final CompanyService companyService;
	private final StoreService storeService;

	@Value("${e201.ocr.url}")
	private String apiUrl;

	@Value("${e201.ocr.key}")
	private String apiKey;

<<<<<<< HEAD
	public LicenseCreateResponse ocrCallApi(MultipartFile file) {
=======
	@Value("${ocr.url}")
=======
	@Value("${e201.ocr.url}")
>>>>>>> be93cfb ([#25] feat: Auth filer에 사업자 등록증 api 등록)
	private String apiUrl;

	@Value("${e201.ocr.key}")
=======
	@Value("${ocr.url}")
	private String apiUrl;
	
	@Value("${ocr.key}")
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
	@Value("${e201.ocr.url}")
	private String apiUrl;

	@Value("${e201.ocr.key}")
>>>>>>> 4608df5 ([#25] feat: Auth filer에 사업자 등록증 api 등록)
	private String apiKey;

	public OcrResultResponse parseBizLicense(MultipartFile file) {

<<<<<<< HEAD
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
	public LicenseCreateResponse ocrForSignup(MultipartFile file) {
		return callApi(file);
	}

	public LicenseReadResponse ocrForContract(AuthInfo authInfo, MultipartFile file) {

		LicenseCreateResponse response = callApi(file);
		// authInfo에 RoleType에 따라서, 검색 진행.
		String ownerid = findOwnerId(authInfo.getRoleType(), response.getRegisterNumber());

		return new LicenseReadResponse(ownerid, response);
	}

	private String findOwnerId(RoleType authInfo, String registerNumber){
		//Todo: KKJ, 사업자등록번호 이용하여 store/company ID 추출.
		return switch (authInfo){
			// case STORE -> companyService.findCompanyIdByRegisterNumber(registerNumber).toString();
			// case COMPANY -> storeService.findStoreIdByRegisterNumber(registerNumber).toString();
			default -> throw new IllegalStateException("Unexpected value: " + authInfo);
		};
	}

	private LicenseCreateResponse callApi(MultipartFile file){
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
		String requestBody = createRequestBody(file);

		ApiResponse responseBody = restClient.post()
			.uri(apiUrl)
			.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.header("X-OCR-SECRET", apiKey)
			.body(requestBody)
			.retrieve()
			.toEntity(ApiResponse.class).getBody();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		String inferResult = responseBody.getImages().getFirst().getInferResult();
		if (!inferResult.equals("SUCCESS"))
			throw new RuntimeException("OCR FAIL");

		LicenseCreateResponse response = parseDataFromJson(responseBody);

		return response;
	}

	private LicenseCreateResponse parseDataFromJson(ApiResponse responseBody) {
		Result bizLicense = responseBody.getImages().getFirst().getBizLicense().getResult();

		String taxType = bizLicense.getTaxType().getFirst().getText();
		String companyName;
		String registerNumber;
		switch (taxType) {
			case "법인사업자" -> {
				companyName = bizLicense.getCorpName().getFirst().getText();
				registerNumber = bizLicense.getCorpRegisterNum().getFirst().getText();
			}
			case "개인사업자" -> {
				companyName = bizLicense.getCompanyName().getFirst().getText();
				registerNumber = bizLicense.getRegisterNumber().getFirst().getText();
			}
			default -> throw new IllegalStateException("Unexpected value: " + taxType);
		}

		String repName = bizLicense.getRepName().getFirst().getText();
=======
		return parseDataFromJson(responseBody);
=======
		OcrResultResponse response = parseDataFromJson(responseBody);
=======
		String inferResult = responseBody.getImages().getFirst().getInferResult();
		if (!inferResult.equals("SUCCESS")) throw new RuntimeException("OCR FAIL");

		LicenseCreateResponse response = parseDataFromJson(responseBody);
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)

		return response;
>>>>>>> be93cfb ([#25] feat: Auth filer에 사업자 등록증 api 등록)
=======
		return parseDataFromJson(responseBody);
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
		OcrResultResponse response = parseDataFromJson(responseBody);

		return response;
>>>>>>> 4608df5 ([#25] feat: Auth filer에 사업자 등록증 api 등록)
	}

	private LicenseCreateResponse parseDataFromJson(ApiResponse responseBody) {
		Result bizLicense = responseBody.getImages().getFirst().getBizLicense().getResult();

		String taxType = bizLicense.getTaxType().getFirst().getText();
		String companyName;
		String registerNumber;
		switch(taxType){
			case "법인사업자" -> {
				companyName = bizLicense.getCorpName().getFirst().getText();
				registerNumber = bizLicense.getCorpRegisterNum().getFirst().getText();
			}
			case "개인사업자" -> {
				companyName = bizLicense.getCompanyName().getFirst().getText();
				registerNumber = bizLicense.getRegisterNumber().getFirst().getText();
			}
			default -> throw new IllegalStateException("Unexpected value: " + taxType);
		}

		String repName = bizLicense.getRepName().getFirst().getText();
<<<<<<< HEAD
		String companyName = bizLicense.getCompanyName().getFirst().getText();
		String registerNumber = bizLicense.getRegisterNumber().getFirst().getText();
<<<<<<< HEAD
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
		String openDate = bizLicense.getOpenDate().getFirst().getText();
		String bisType = bizLicense.getBisType().getFirst().getText();
		String bisItem = bizLicense.getBisItem().getFirst().getText();
		String bisAddress = bizLicense.getBisAddress().getFirst().getText();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		return new LicenseCreateResponse(repName, companyName, registerNumber, openDate, bisType, bisItem, bisAddress);
=======
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
		return OcrResultResponse.builder()
			.representationName(repName)
			.companyName(companyName)
			.registerNumber(registerNumber)
			.openDate(openDate)
			.bisType(bisType)
			.bisItem(bisItem)
			.bisAddress(bisAddress)
			.build();
<<<<<<< HEAD
>>>>>>> accb0ed ([#25] feat: 사업자 등록증 API 연동)
=======
>>>>>>> c03792d ([#25] feat: 사업자 등록증 API 연동)
=======
		return new LicenseCreateResponse(repName, companyName, registerNumber, openDate, bisType, bisItem, bisAddress);
>>>>>>> 21808c9 ([#25] feat: OCR 관련 로직 보완)
	}

	private String createRequestBody(MultipartFile file) {
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("version", "V2");
		requestMap.put("requestId", UUID.randomUUID().toString());
		requestMap.put("timestamp", System.currentTimeMillis());

		List<Map<String, Object>> images = new ArrayList<>();
		Map<String, Object> image = new HashMap<>();
		image.put("format", getImageFormat(file.getOriginalFilename()));
		image.put("name", file.getOriginalFilename());
		try {
			byte[] imageBytes = file.getBytes();

			String base64Image = Base64.getEncoder().encodeToString(imageBytes);
			image.put("data", base64Image);
		} catch (IOException e) {
			throw new RuntimeException("Image to ByteArray Convert Fail");
		}

		images.add(image);
		requestMap.put("images", images);

		try {
			return mapper.writeValueAsString(requestMap);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Fail to Serialize JSON");
		}
	}

	private String getImageFormat(String originalFilename) {
		return Optional.ofNullable(originalFilename)
			.filter(f -> f.contains("."))
			.map(f -> f.substring(f.lastIndexOf(".") + 1).toLowerCase())
			.orElse("jpg");
	}
}
