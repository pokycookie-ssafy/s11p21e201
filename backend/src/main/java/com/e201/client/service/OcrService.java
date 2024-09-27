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

import com.e201.client.controller.response.OcrResultResponse;
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

	@Value("${ocr.url}")
	private String apiUrl;
	
	@Value("${ocr.key}")
	private String apiKey;

	public OcrResultResponse parseBizLicense(MultipartFile file) {

		String requestBody = createRequestBody(file);

		ApiResponse responseBody = restClient.post()
			.uri(apiUrl)
			.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.header("X-OCR-SECRET", apiKey)
			.body(requestBody)
			.retrieve()
			.toEntity(ApiResponse.class).getBody();

		return parseDataFromJson(responseBody);
	}

	private OcrResultResponse parseDataFromJson(ApiResponse responseBody) {
		Result bizLicense = responseBody.getImages().getFirst().getBizLicense().getResult();

		String repName = bizLicense.getRepName().getFirst().getText();
		String companyName = bizLicense.getCompanyName().getFirst().getText();
		String registerNumber = bizLicense.getRegisterNumber().getFirst().getText();
		String openDate = bizLicense.getOpenDate().getFirst().getText();
		String bisType = bizLicense.getBisType().getFirst().getText();
		String bisItem = bizLicense.getBisItem().getFirst().getText();
		String bisAddress = bizLicense.getBisAddress().getFirst().getText();

		return OcrResultResponse.builder()
			.representationName(repName)
			.companyName(companyName)
			.registerNumber(registerNumber)
			.openDate(openDate)
			.bisType(bisType)
			.bisItem(bisItem)
			.bisAddress(bisAddress)
			.build();
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
