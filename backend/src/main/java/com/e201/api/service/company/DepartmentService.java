package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.department.DepartmentCreateRequest;
import com.e201.api.controller.company.response.department.DepartmentCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;
import com.e201.domain.repository.company.DepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class DepartmentService {

	private final DepartmentRepository departmentRepository;
	private final CompanyService companyService;

	@JtaTransactional
	public DepartmentCreateResponse create(DepartmentCreateRequest request) {
		Company company = companyService.findEntity(request.getCompanyId());
		Department department = request.toEntity(company);
		Department savedDepartment = departmentRepository.save(department);
		return new DepartmentCreateResponse(savedDepartment.getId());
	}

	public Department findEntity(UUID id) {
		return departmentRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
