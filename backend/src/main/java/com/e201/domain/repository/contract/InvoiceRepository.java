package com.e201.domain.repository.contract;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.contract.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
	List<Invoice> findByContractId(UUID contractId);
}
