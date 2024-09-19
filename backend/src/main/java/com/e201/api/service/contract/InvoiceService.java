package com.e201.api.service.contract;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.domain.entity.contract.Invoice;
import com.e201.domain.repository.contract.InvoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceService {

	private final InvoiceRepository invoiceRepository;

	public Invoice findDomain(UUID id){
		return invoiceRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}
}
