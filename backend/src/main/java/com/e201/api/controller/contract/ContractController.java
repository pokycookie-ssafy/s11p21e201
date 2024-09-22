package com.e201.api.controller.contract;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e201.api.controller.contract.request.ContractCreateRequest;
import com.e201.api.controller.contract.request.ContractRespondCondition;
import com.e201.api.controller.contract.response.ContractCreateResponse;
import com.e201.api.controller.contract.response.ContractRespondResponse;
import com.e201.api.service.contract.ContractService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ContractController {

	private final ContractService contractService;

	@PostMapping("/contracts")
	public ResponseEntity<ContractCreateResponse> create(@RequestBody ContractCreateRequest request) {
		// senderType
		String senderType = "STORE";
		ContractCreateResponse response = contractService.create(senderType, request);
		return ResponseEntity.status(CREATED).body(response);
	}

	@PostMapping("/contracts/respond")
	public ResponseEntity<ContractRespondResponse> respond(@RequestBody ContractRespondCondition request) {
		String senderType = "STORE";
		ContractRespondResponse response = contractService.respond(request);
		return ResponseEntity.status(OK).body(response);
	}

	@DeleteMapping("/contracts/{contractId}")
	public ResponseEntity<Object> delete(@PathVariable String contractId) {
		try{
			contractService.delete(contractId);
			return ResponseEntity.status(NO_CONTENT).build();
		} catch (Exception e){
			return ResponseEntity.status(BAD_REQUEST).build();
		}
	}
}
