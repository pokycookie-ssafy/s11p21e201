package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.company.Department;
import com.e201.domain.repository.company.DepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentService {

	private final DepartmentRepository departmentRepository;

	public Department findDomain(UUID id) {
		return departmentRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
