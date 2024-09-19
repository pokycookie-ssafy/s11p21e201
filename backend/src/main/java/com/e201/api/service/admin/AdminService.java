package com.e201.api.service.admin;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.admin.Admin;
import com.e201.domain.repository.admin.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

	private final AdminRepository adminRepository;

	public Admin findDomain(UUID id){
		return adminRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
