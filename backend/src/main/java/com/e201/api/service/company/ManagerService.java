package com.e201.api.service.company;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.manager.ManagerAuthRequest;
import com.e201.api.controller.company.request.manager.ManagerCreateRequest;
import com.e201.api.controller.company.response.manager.ManagerCreateResponse;
import com.e201.api.controller.company.response.manager.ManagerFindResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.ManagerRepository;
import com.e201.global.exception.EntityNotFoundException;
import com.e201.global.exception.PasswordIncorrectException;
import com.e201.global.security.auth.constant.RoleType;
import com.e201.global.security.auth.dto.AuthInfo;
import com.e201.global.security.cipher.service.OneWayCipherService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class ManagerService {

	private final CompanyService companyService;
	private final ManagerRepository managerRepository;
	private final DepartmentService departmentService;
	private final OneWayCipherService oneWayCipherService;

	@JtaTransactional
	public ManagerCreateResponse create(ManagerCreateRequest request) {
		Department department = departmentService.findEntity(request.getDepartmentId());
		Manager manager = request.toEntity(department);
		encryptPassword(manager);
		Manager savedManager = managerRepository.save(manager);
		return new ManagerCreateResponse(savedManager.getId());
	}

	public AuthInfo checkPassword(ManagerAuthRequest request) {
		Manager manager = managerRepository.findByCode(request.getCode())
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, MANAGER.name()));
		validatePassword(request, manager);
		return new AuthInfo(manager.getId(), RoleType.MANAGER);
	}

	public Manager findEntity(UUID id) {
		return managerRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, MANAGER.name()));
	}

	public Page<ManagerFindResponse> findPage(UUID companyId, Pageable pageable) {
		Company company = companyService.findEntity(companyId);
		return managerRepository.findAllByCompany(company, pageable).map(ManagerFindResponse::of);
	}

	private void encryptPassword(Manager manager) {
		String encryptedPassword = oneWayCipherService.encrypt(manager.getPassword());
		manager.changePassword(encryptedPassword);
	}

	private void validatePassword(ManagerAuthRequest request, Manager manager) {
		if (!oneWayCipherService.match(request.getPassword(), manager.getPassword())) {
			throw new PasswordIncorrectException(AUTHENTICATION_FAILED, MANAGER.name());
		}
	}
}
