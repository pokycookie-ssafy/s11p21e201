package com.e201.api.service.company;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.CompanyAccount;
import com.e201.domain.repository.company.CompanyAccountRepository;
import com.e201.global.exception.EntityNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class CompanyAccountService {

	private final CompanyAccountRepository companyAccountRepository;

	public CompanyAccount findEntity(UUID id) {
		return companyAccountRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, COMPANY_ACCOUNT.name()));
	}
}
