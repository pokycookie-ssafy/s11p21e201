package com.e201.api.service.store;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.FindPaymentsCondition;
import com.e201.api.controller.store.request.PaymentMenuCreateRequest;
import com.e201.api.controller.store.request.StorePaymentCreateRequest;
import com.e201.api.controller.store.response.FindPaymentMenu;
import com.e201.api.controller.store.response.FindPaymentsResponse;
import com.e201.api.service.company.CompanyService;
import com.e201.api.service.company.EmployeeService;
import com.e201.api.service.contract.ContractService;
import com.e201.api.service.payment.PaymentService;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.company.Company;
import com.e201.domain.entity.company.Department;
import com.e201.domain.entity.company.Employee;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.payment.Payment;
import com.e201.domain.entity.store.Menu;
import com.e201.domain.entity.store.Sales;
import com.e201.domain.entity.store.Store;
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
	private final CompanyService companyService;

	public Sales findEntity(UUID id) {
		return salesRepository.findById(id).orElseThrow(() -> new RuntimeException("not found exception"));
	}

	@JtaTransactional
	public UUID createPayment(StorePaymentCreateRequest storePaymentCreateRequest, UUID storeId) {
		//employeeId로 companyId 조회 -> emplyeeId로 department_id 조회, department의 id와 일치하는 department 모두 조회
		// department에서 companyId 조회
		Company company = findCompany(storePaymentCreateRequest);
		//company_id 와 store_id 로 contract_id 조회
		Contract contract = contractService.findContractWithCompanyIdAndStoreId(company.getId(), storeId);
		Store store = storeService.findEntity(storeId);
		//contract_id, employee_id, totalAmount
		Payment savedPayment = paymentService.save(contract.getId(), storePaymentCreateRequest.getEmployeeId(), store,
			storePaymentCreateRequest.getTotalAmount());

		//sales에 for menuList
		for(PaymentMenuCreateRequest menuRequest:storePaymentCreateRequest.getMenus()){
			Menu menu = menuService.findEntity(menuRequest.getId());
			createSales(menu, company.getId(),storeId, savedPayment.getId(), storePaymentCreateRequest.getEmployeeId());
			}

		return savedPayment.getId();
	}

	@JtaTransactional
	public void createSales(Menu menu, UUID companyId, UUID storeId, UUID paymentId, UUID employeeId){
		Sales saveSales = Sales.builder()
			.companyId(companyId)
			.menu(menu)
			.employeeId(employeeId)
			.paymentId(paymentId)
			.storeId(storeId)
			.build();
		salesRepository.save(saveSales);
	}

	public Company findCompany(StorePaymentCreateRequest storePaymentCreateRequest){
		Employee employee = employeeService.findEntity(storePaymentCreateRequest.getEmployeeId());
		Department department = employee.getDepartment();
		return department.getCompany();
	}


	public List<FindPaymentsResponse> findStorePayments(UUID storeId, FindPaymentsCondition findPaymentsCondition) {
		List<Sales> salesList;
		Map<UUID, FindPaymentsResponse> map = new HashMap<>();
		if(findPaymentsCondition.getCompanyId()==null){
			//모든 company에 대한 payments들 조회
			salesList = salesRepository.findByStartDateBetween( storeId,findPaymentsCondition.getStart(),
				findPaymentsCondition.getEnd());

		}else{
			//특정 회사에 대한 payments들 조회
			salesList= salesRepository.findSalesByCompanyIdAndDateRange(storeId,
				findPaymentsCondition.getCompanyId(), findPaymentsCondition.getStart(),
				findPaymentsCondition.getEnd());
		}
		//결과 값 생성
		for(Sales sales:salesList){
			if(map.containsKey(sales.getPaymentId())){
				FindPaymentMenu menu = createFindPaymentMenu(sales);
				map.get(sales.getPaymentId()).getMenus().add(menu);
			}else{
				Employee emp = employeeService.findEntity(sales.getEmployeeId());
				Company company = companyService.findEntity(sales.getCompanyId());
				List<FindPaymentMenu> menus = new ArrayList<>();
				FindPaymentMenu menu = createFindPaymentMenu(sales);
				menus.add(menu);
				FindPaymentsResponse response = createFindPaymentsResponse(sales, menus, emp, company);
				map.put(sales.getPaymentId(),response);
			}
		}
		return new ArrayList<>(map.values());
	}

	private static FindPaymentMenu createFindPaymentMenu(Sales sales) {
		return  FindPaymentMenu.builder().name(sales.getMenu().getName())
			.price(sales.getMenu().getPrice())
			.build();
	}

	private static FindPaymentsResponse createFindPaymentsResponse(Sales sales, List<FindPaymentMenu> menus, Employee emp,
		Company company) {
		return FindPaymentsResponse.builder()
			.paymentId(sales.getPaymentId())
			.employeeId(sales.getEmployeeId())
			.companyId(sales.getEmployeeId())
			.createdAt(sales.getCreatedAt())
			.menus(menus)
			.employeeCode(emp.getCode())
			.companyName(company.getCompanyInfo().getName())
			.build();
	}
}
