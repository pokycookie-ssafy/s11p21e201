package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Company;
import com.e201.domain.repository.company.CompanyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyService extends BaseEntity {

	private final CompanyRepository companyRepository;

	public Company findEntity(UUID id) {
		return companyRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
