package com.e201.domain.repository.store;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.Sales;

public interface SalesRepository extends JpaRepository<Sales,UUID> {
}
