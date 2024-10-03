package com.e201.api.service.company;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.company.CompanyAuthRequest;
import com.e201.api.controller.company.request.company.CompanyCreateRequest;
import com.e201.api.controller.company.request.companyAccount.CompanyAccountCreateRequest;
import com.e201.api.controller.company.response.company.CompanyCreateResponse;
import com.e201.api.controller.store.request.StoreAccountCreateRequest;
import com.e201.client.service.financial.FinancialService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyAccount;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.repository.company.CompanyAccountRepository;
import com.e201.domain.repository.company.CompanyRepository;
import com.e201.global.exception.EntityNotFoundException;
import com.e201.global.exception.PasswordIncorrectException;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class CompanyService extends BaseEntity {

	private final CompanyRepository companyRepository;
	private final CompanyInfoService companyInfoService;
	private final CompanyAccountRepository comapanyAccountRepository;
	private final FinancialService financialService;
	private final OneWayCipherService oneWayCipherService;

	@JtaTransactional
	public CompanyCreateResponse create(CompanyCreateRequest request) {
		CompanyInfo companyInfo = companyInfoService.findEntity(request.getCompanyInfoId());
		Company company = request.toEntity(companyInfo);
		encryptPassword(company);
		Company savedCompany = companyRepository.save(company);
		// 계좌 생성
		String accountNo = financialService.createAccount();
		financialService.updateAccountBalance(accountNo, 1000000000L);
		CompanyAccountCreateRequest accountCreateRequest = CompanyAccountCreateRequest
			.builder()
			.bankCode("999")
			.bankName("싸피은행")
			.accountNumber(accountNo)
			.build();
		CompanyAccount savedCompanyAccount = comapanyAccountRepository.save(accountCreateRequest.toEntity(company));

		return new CompanyCreateResponse(savedCompany.getId());
	}

	public AuthInfo checkPassword(CompanyAuthRequest request) {
		Company company = companyRepository.findByEmail(request.getEmail())
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, COMPANY.name()));
		validatePassword(request, company);
		return new AuthInfo(company.getId(), RoleType.COMPANY);
	}

	public Company findEntity(UUID id) {
		return companyRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, COMPANY.name()));
	}

	private void encryptPassword(Company company) {
		String encryptedPassword = oneWayCipherService.encrypt(company.getPassword());
		company.changePassword(encryptedPassword);
	}

	private void validatePassword(CompanyAuthRequest request, Company company) {
		if (!oneWayCipherService.match(request.getPassword(), company.getPassword())) {
			throw new PasswordIncorrectException(AUTHENTICATION_FAILED, COMPANY.name());
		}
	}

	public Company findCompanyByRegisterNo(String registerNo) {
		List<Company> companies = companyRepository.findByRegisterNoWithCompanyInfo(registerNo);
		Company company = companies.getFirst();
		return company;
	}
}
