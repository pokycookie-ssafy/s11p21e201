package com.e201;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.company.Company;
import com.e201.domain.repository.company.CompanyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestService {

	private final CompanyRepository companyRepository;

	// public String test() {
	// 	Company company = Company.builder()
	// 		.name("company")
	// 		.build();
	// 	companyRepository.save(company);
	// 	return "success";
	// }
}
