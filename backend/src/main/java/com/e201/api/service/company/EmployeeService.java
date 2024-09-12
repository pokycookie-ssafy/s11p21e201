package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.BaseEntity;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.repository.company.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService extends BaseEntity {

	private final EmployeeRepository employeeRepository;

	public Employee findDomain(UUID id) {
		return employeeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
