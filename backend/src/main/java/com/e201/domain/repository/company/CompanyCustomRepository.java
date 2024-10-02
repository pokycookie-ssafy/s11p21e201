package com.e201.domain.repository.company;

import java.util.List;

import com.e201.domain.entity.company.Company;

public interface CompanyCustomRepository {
	List<Company> findByRegisterNoWithCompanyInfo(String registerNo);
}
