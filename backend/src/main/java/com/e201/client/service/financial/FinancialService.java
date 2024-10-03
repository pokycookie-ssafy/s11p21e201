package com.e201.client.service.financial;

import static org.springframework.http.HttpHeaders.*;
import static org.springframework.http.MediaType.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.e201.client.controller.financial.request.FinDepositRequest;
import com.e201.client.service.financial.response.FinCreateResponse;
import com.e201.client.service.financial.response.FinTransferResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FinancialService {

	private final RestClient restClient;
	private final ObjectMapper mapper = new ObjectMapper();

	@Value("${e201.fin.baseUrl}")
	private String finUrl;

	@Value("${e201.fin.apiKey}")
	private String finApiKey;

	@Value("${e201.fin.userKey}")
	private String finUserKey;

	@Value("${e201.fin.accountTypeNo}")
	private String finAccountTypeNo;

	public String createAccount(){
		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("Header", createRequestHeader("createDemandDepositAccount",true));
		requestBodyMap.put("accountTypeUniqueNo", finAccountTypeNo);

		String requestBody = mapToStringConverter(requestBodyMap);

		FinCreateResponse responseBody = restClient.post()
			.uri(finUrl+"demandDeposit/createDemandDepositAccount")
			.header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
			.body(requestBody)
			.retrieve()
			.toEntity(FinCreateResponse.class).getBody();

		String responseCode =responseBody.getHeader().getResponseCode().toString();
		if(responseCode.equals("H0000")){
			return responseBody.getRec().getAccountNo().toString();
		} else {
			throw new RuntimeException("계좌 생성에 실패하였습니다.");
		}
	}

	public boolean updateTransferLimit(String accountNo, Long onceLimit, Long dailyLimit){
		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("Header", createRequestHeader("updateTransferLimit",true));
		requestBodyMap.put("accountNo", accountNo);
		requestBodyMap.put("oneTimeTransferLimit", onceLimit);
		requestBodyMap.put("dailyTransferLimit", dailyLimit);

		String requestBody = mapToStringConverter(requestBodyMap);

		FinCreateResponse responseBody = restClient.post()
			.uri(finUrl+"demandDeposit/updateTransferLimit")
			.header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
			.body(requestBody)
			.retrieve()
			.toEntity(FinCreateResponse.class).getBody();
		String responseCode =responseBody.getHeader().getResponseCode().toString();
		if(responseCode.equals("H0000")){
			return true;
		} else {
			throw new RuntimeException("이체 한도 변경에 실패하였습니다.");
		}
	}

	public String depositAccountTransfer(FinDepositRequest request){
		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("Header", createRequestHeader("updateDemandDepositAccountTransfer",true));
		requestBodyMap.put("depositAccountNo", request.getRececiverAccountNo());
		requestBodyMap.put("withdrawalAccountNo", request.getSenderAccountNo());
		requestBodyMap.put("transactionBalance", request.getTransactionBalance());
		String requestBody = mapToStringConverter(requestBodyMap);

		FinTransferResponse responseBody = restClient.post()
			.uri(finUrl+"demandDeposit/updateDemandDepositAccountTransfer")
			.header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
			.body(requestBody)
			.retrieve()
			.toEntity(FinTransferResponse.class).getBody();
		String responseCode =responseBody.getHeader().getResponseCode().toString();
		if(!responseCode.equals("H0000")){
			throw new RuntimeException("계좌이체에 실패하였습니다.");
		} else {
			return "SUCCESS";
		}
	}

	private void updateAccountBalance(String accountNo, Long transactionBalance){
		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("Header", createRequestHeader("updateAccountBalance",true));
		requestBodyMap.put("accountNo", accountNo);
		requestBodyMap.put("transactionBalance", transactionBalance);
		String requestBody = mapToStringConverter(requestBodyMap);

		FinCreateResponse responseBody = restClient.post()
			.uri(finUrl+"demandDeposit/updateDemandDepositAccountDeposit")
			.header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
			.body(requestBody)
			.retrieve()
			.toEntity(FinCreateResponse.class).getBody();
		String responseCode =responseBody.getHeader().getResponseCode().toString();
		if(!responseCode.equals("H0000")){
			throw new RuntimeException("계좌이체에 실패하였습니다.");
		}
	}

	private String mapToStringConverter(Map<String,Object> request){
		try{
			return mapper.writeValueAsString(request);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Fail to Serialize JSON");
		}
	}

	private Map<String, String> createRequestHeader(String apiName, boolean needUser){

		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

		String txDate = currentTime.format(DateTimeFormatter.ofPattern("yyyMMdd"));
		String txTime = currentTime.format(DateTimeFormatter.ofPattern("HHmmss"));
		String randNum = String.valueOf((int)(Math.random() * 899999) + 100000);

		Map<String, String> requestHeader = new HashMap<>();
		requestHeader.put("apiName", apiName);
        requestHeader.put("transmissionDate", txDate);
        requestHeader.put("transmissionTime", txTime);
        requestHeader.put("institutionCode", "00100");
        requestHeader.put("fintechAppNo", "001");
        requestHeader.put("apiServiceCode", apiName);
        requestHeader.put("institutionTransactionUniqueNo", txDate+txTime+randNum);
        requestHeader.put("apiKey", finApiKey);
		if (needUser) requestHeader.put("userKey", finUserKey);
		return requestHeader;
	}

}
