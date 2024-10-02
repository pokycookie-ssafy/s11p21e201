package com.e201.client.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
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

import com.e201.api.service.company.CompanyService;
import com.e201.api.service.store.StoreService;
import com.e201.client.controller.response.LicenseCreateResponse;
import com.e201.client.service.response.ApiResponse;
import com.e201.client.service.response.Result;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OcrService {
	private final RestClient restClient;
	private final ObjectMapper mapper = new ObjectMapper();

	private final CompanyService companyService;
	private final StoreService storeService;

	@Value("${e201.ocr.url}")
	private String apiUrl;

	@Value("${e201.ocr.key}")
	private String apiKey;

	public LicenseCreateResponse ocrCallApi(MultipartFile file) {
		String requestBody = createRequestBody(file);

		ApiResponse responseBody = restClient.post()
			.uri(apiUrl)
			.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.header("X-OCR-SECRET", apiKey)
			.body(requestBody)
			.retrieve()
			.toEntity(ApiResponse.class).getBody();

		String inferResult = responseBody.getImages().getFirst().getInferResult();
		if (!inferResult.equals("SUCCESS"))
			throw new RuntimeException("OCR FAIL");

		LicenseCreateResponse response = parseDataFromJson(responseBody);

		return response;
	}

	private LicenseCreateResponse parseDataFromJson(ApiResponse responseBody) {
		Result bizLicense = responseBody.getImages().getFirst().getBizLicense().getResult();

		String taxType = bizLicense.getTaxType().getFirst().getText();
		String businessName;
		switch (taxType) {
			case "법인사업자" -> {
				businessName = bizLicense.getCorpName().getFirst().getText();
			}
			case "일반과세자", "간이과세자" -> {
				businessName = bizLicense.getCompanyName().getFirst().getText();
			}
			default -> throw new IllegalStateException("Unexpected value: " + taxType);
		}

		String repName = bizLicense.getRepName().getFirst().getText();
		String openDate = bizLicense.getOpenDate().getFirst().getText();
		String businessType = bizLicense.getBisType().getFirst().getText();
		String address = bizLicense.getBisAddress().getFirst().getText();
		String registerNumber= bizLicense.getRegisterNumber().getFirst().getText();

		return new LicenseCreateResponse(repName, businessName, registerNumber, address, openDate, businessType);
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
