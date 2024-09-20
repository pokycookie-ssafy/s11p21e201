package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.CompanyCreateRequest;
import com.e201.api.controller.company.response.CompanyCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class CompanyService extends BaseEntity {

	private final CompanyRepository companyRepository;
	private final CompanyInfoService companyInfoService;

	@JtaTransactional
	public CompanyCreateResponse create(CompanyCreateRequest request) {
		CompanyInfo companyInfo = companyInfoService.findEntity(request.getCompanyInfoId());
		Company company = request.toEntity(companyInfo);
		Company savedCompany = companyRepository.save(company);
		return new CompanyCreateResponse(savedCompany.getId());
	}

	public Company findEntity(UUID id) {
		return companyRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
