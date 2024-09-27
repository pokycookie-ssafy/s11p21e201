package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.SalesCreateRequest;
import com.e201.api.controller.store.response.SalesCreateResponse;
import com.e201.api.service.company.CompanyInfoService;
import com.e201.api.service.company.CompanyService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Sales;
import com.e201.domain.repository.store.SalesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalesService {

	private final SalesRepository salesRepository;
	private final CompanyService companyService;
	private final MenuService menuService;
	private final CompanyInfoService companyInfoService;

	@JtaTransactional
	public SalesCreateResponse create(SalesCreateRequest salesRequest){
		Company company = companyService.findEntity(salesRequest.getCompanyId());
		CompanyInfo companyInfo = companyInfoService.findEntity(company.getCompanyInfo().getId());
		Menu menu = menuService.findEntity(salesRequest.getMenuId());
		Sales sales = salesRequest.toEntity(menu);
		Sales savedSales = salesRepository.save(sales);

		return SalesCreateResponse.builder().
			id(savedSales.getId())
			.companyId(savedSales.getCompanyId())
			.companyName(companyInfo.getName())
			.menuName(menu.getName())
			.build();
	}

	public Sales findEntity(UUID id) {
		return salesRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

}
