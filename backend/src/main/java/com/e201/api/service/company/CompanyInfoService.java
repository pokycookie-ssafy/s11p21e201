package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyInfoService {

	private final CompanyInfoRepository companyInfoRepository;

	public CompanyInfo findEntity(UUID id) {
		return companyInfoRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
