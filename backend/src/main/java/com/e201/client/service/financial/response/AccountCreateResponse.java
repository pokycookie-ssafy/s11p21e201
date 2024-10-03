package com.e201.client.service.financial.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountCreateResponse {
	private String bankCode;
	private String accountNo;
}
