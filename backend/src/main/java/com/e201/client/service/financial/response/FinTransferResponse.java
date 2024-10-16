package com.e201.client.service.financial.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FinTransferResponse {

	@JsonProperty("Header")
	private CommonResponseHeader header;

	@JsonProperty("REC")
	private List<AccountCreateResponse> rec;
}
