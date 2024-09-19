package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.company.CompanyAccount;
import com.e201.domain.repository.company.CompanyAccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyAccountService {

	private final CompanyAccountRepository companyAccountRepository;

	public CompanyAccount findEntity(UUID id) {
		return companyAccountRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
