package com.e201.domain.repository.store;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.e201.domain.entity.store.Sales;

public interface SalesRepository extends JpaRepository<Sales, UUID> {

	@Query("SELECT s FROM Sales s WHERE s.storeId= :storeId AND s.companyId = :companyId AND s.createdAt >= :startDate AND s.createdAt <= :endDate")
	List<Sales> findSalesByCompanyIdAndDateRange(
		@Param("storeId") UUID storeId,
		@Param("companyId") UUID companyId,
		@Param("startDate") LocalDateTime startDate,
		@Param("endDate") LocalDateTime endDate);

	@Query("SELECT s FROM Sales s WHERE s.storeId= :storeId AND s.createdAt >= :startDate AND s.createdAt <= :endDate")
	List<Sales> findByStartDateBetween(
		@Param("storeId") UUID storeId,
		@Param("startDate") LocalDateTime startDate,
		@Param("endDate") LocalDateTime endDate);

	@Query("select s from Sales s join fetch Menu m on s.menu.id = m.id where s.paymentId = :paymentId")
	List<Sales> findByPaymentId(UUID paymentId);
}

