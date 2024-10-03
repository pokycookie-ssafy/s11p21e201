package com.e201.client.service.financial.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FinCreateResponse {

	@JsonProperty("Header")
	private CommonResponseHeader header;

	@JsonProperty("REC")
	private AccountCreateResponse rec;
}
