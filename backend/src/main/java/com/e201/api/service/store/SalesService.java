package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.store.Sales;
import com.e201.domain.repository.store.SalesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalesService {

	private final SalesRepository salesRepository;

	public Sales findEntity(UUID id) {
		return salesRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
