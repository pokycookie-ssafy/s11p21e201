package com.e201.domain.repository.contract;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import com.e201.domain.entity.contract.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
}
