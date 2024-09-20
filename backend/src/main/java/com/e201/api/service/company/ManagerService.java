package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.EmployeeCreateRequest;
import com.e201.api.controller.company.request.ManagerCreateRequest;
import com.e201.api.controller.company.response.EmployeeCreateResponse;
import com.e201.api.controller.company.response.ManagerCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.ManagerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@JtaTransactional(readOnly = true)
public class ManagerService {

	private final ManagerRepository managerRepository;
	private final DepartmentService departmentService;

	@JtaTransactional
	public ManagerCreateResponse create(ManagerCreateRequest request) {
		Department department = departmentService.findEntity(request.getDepartmentId());
		Manager manager = request.toEntity(department);
		Manager savedManager = managerRepository.save(manager);
		return new ManagerCreateResponse(savedManager.getId());
	}

	public Manager findEntity(UUID id) {
		return managerRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
