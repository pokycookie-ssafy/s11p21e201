package com.e201.api.service.store;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.PaymentMenuCreateRequest;
import com.e201.api.controller.store.request.SalesCreateRequest;
import com.e201.api.controller.store.request.StorePaymentCreateRequest;
import com.e201.api.controller.store.response.SalesCreateResponse;
import com.e201.api.service.company.CompanyInfoService;
import com.e201.api.service.company.CompanyService;
import com.e201.api.service.company.DepartmentService;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.contract.ContractService;
import com.e201.api.service.payment.PaymentService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.CompanyInfo;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Sales;
import com.e201.domain.entity.store.Store;
import com.e201.domain.repository.company.DepartmentRepository;
import com.e201.domain.repository.store.MenuRepository;
import com.e201.domain.repository.store.SalesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalesService {

	private final SalesRepository salesRepository;
	private final EmployeeService employeeService;
	private final ContractService contractService;
	private final MenuService menuService;
	private final PaymentService paymentService;
	private final StoreService storeService;

	public Sales findEntity(UUID id) {
		return salesRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	@JtaTransactional
	public void createPayment(StorePaymentCreateRequest storePaymentCreateRequest, UUID storeId) {
		//employeeId로 companyId 조회 -> emplyeeId로 department_id 조회, department의 id와 일치하는 department 모두 조회
		// department에서 companyId 조회
		Company company = findCompany(storePaymentCreateRequest);
		//company_id 와 store_id 로 contract_id 조회
		Contract contract = contractService.findContractWithCompanyIdAndStoreId(company.getId(), storeId);

		//sales에 for menuList
		for(PaymentMenuCreateRequest menuRequest:storePaymentCreateRequest.getMenus()){
			Menu menu = menuService.findEntity(menuRequest.getId());
			createSales(menu, company.getId());
		}
		//contract_id, employee_id, totalAmount
		Store store = storeService.findEntity(storeId);
		paymentService.save(contract.getId(), storePaymentCreateRequest.getEmployeeId(), store, storePaymentCreateRequest.getTotalAmount());
	}

	public void createSales(Menu menu, UUID companyId){
		Sales saveSales = Sales.builder().companyId(companyId).menu(menu).build();
		salesRepository.save(saveSales);
	}
	public Company findCompany(StorePaymentCreateRequest storePaymentCreateRequest){
		Employee employee = employeeService.findEntity(storePaymentCreateRequest.getEmployeeId());
		Department department = employee.getDepartment();
		return department.getCompany();
	}
}
