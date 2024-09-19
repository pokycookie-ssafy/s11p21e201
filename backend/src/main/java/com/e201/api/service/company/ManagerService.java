package com.e201.api.service.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.company.Manager;
import com.e201.domain.repository.company.ManagerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerService {

	private final ManagerRepository managerRepository;

	public Manager findEntity(UUID id) {
		return managerRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
