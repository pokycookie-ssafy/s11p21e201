package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.company.request.employee.EmployeeAuthRequest;
import com.e201.api.controller.company.request.manager.ManagerAuthRequest;
import com.e201.api.controller.company.request.manager.ManagerCreateRequest;
import com.e201.api.controller.company.response.manager.ManagerCreateResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.ManagerRepository;
import com.e201.global.auth.RoleType;
import com.e201.global.auth.response.AuthResponse;

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

	public AuthResponse checkPassword(ManagerAuthRequest request) {
		Manager manager = managerRepository.findByCode(request.getCode())
			.orElseThrow(() -> new RuntimeException("not found manager"));
		validatePassword(request, manager);
		return new AuthResponse(manager.getId(), RoleType.MANAGER);
	}

	public Manager findEntity(UUID id) {
		return managerRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	private void validatePassword(ManagerAuthRequest request, Manager manager) {
		if(!request.getPassword().equals(manager.getPassword())) {
			throw new RuntimeException("wrong password");
		}
	}
}
