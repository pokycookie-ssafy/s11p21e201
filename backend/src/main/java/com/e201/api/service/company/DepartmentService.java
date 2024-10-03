package com.e201.api.service.company;

import static com.e201.domain.entity.EntityConstant.*;
import static com.e201.global.exception.ErrorCode.*;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.department.DepartmentCreateRequest;
import com.e201.api.controller.company.response.department.DepartmentCreateResponse;
import com.e201.api.controller.company.response.department.DepartmentFindResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;
import com.e201.domain.repository.company.DepartmentRepository;
import com.e201.global.exception.EntityNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class DepartmentService {

	private final DepartmentRepository departmentRepository;
	private final CompanyService companyService;

	@JtaTransactional
	public DepartmentCreateResponse create(DepartmentCreateRequest request, UUID companyId) {
		Company company = companyService.findEntity(companyId);
		Department department = request.toEntity(company);
		Department savedDepartment = departmentRepository.save(department);
		return new DepartmentCreateResponse(savedDepartment.getId());
	}

	public List<DepartmentFindResponse> findAllByCompanyId(UUID companyId) {
		Company company = companyService.findEntity(companyId);
		return departmentRepository.findAllByCompany(company).stream().map(DepartmentFindResponse::of).toList();
	}

	public Department findEntity(UUID id) {
		return departmentRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(NOT_FOUND, DEPARTMENT.name()));
	}
}
