package com.e201.api.service.contract;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.contract.Contract;
import com.e201.domain.repository.contract.ContractRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractService {
	private final ContractRepository contractRepository;

	public Contract findDomain(UUID id){
		return contractRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
