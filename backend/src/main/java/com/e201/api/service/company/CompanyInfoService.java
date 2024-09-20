package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.companyinfo.CompanyInfoCreateRequest;
import com.e201.api.controller.company.response.companyinfo.CompanyInfoCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class CompanyInfoService {

	private final CompanyInfoRepository companyInfoRepository;

	@JtaTransactional
	public CompanyInfoCreateResponse create(CompanyInfoCreateRequest request) {
		CompanyInfo companyInfo = request.toEntity();
		CompanyInfo savedCompanyInfo = companyInfoRepository.save(companyInfo);
		return new CompanyInfoCreateResponse(savedCompanyInfo.getId());
	}

	public CompanyInfo findEntity(UUID id) {
		return companyInfoRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
