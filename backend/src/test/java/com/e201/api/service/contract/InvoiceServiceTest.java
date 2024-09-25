package com.e201.api.service.contract;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.e201.api.controller.contract.response.InvoiceCreateResponse;
import com.e201.api.controller.contract.response.InvoiceDownloadResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
<<<<<<< HEAD
<<<<<<< Updated upstream
import com.e201.domain.entity.contract.Invoice;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import com.e201.domain.entity.contract.Status;
<<<<<<< HEAD
=======
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.contract.Invoice;
>>>>>>> Stashed changes
=======
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.ContractStatus;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.Status;
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
import com.e201.domain.entity.contract.ContractStatus;
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
import com.e201.domain.entity.contract.ContractStatus;
import com.e201.domain.entity.contract.Invoice;
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.contract.InvoiceRepository;

@SpringBootTest
public class InvoiceServiceTest {
	@Autowired
	ContractRepository contractRepository;

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Autowired
	InvoiceService sut;

	Contract contract;

	@BeforeEach
	void setUp() {
		UUID companyId = UUID.randomUUID();
		UUID storeId = UUID.randomUUID();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
=======
		contract = createContract(companyId, storeId, Status.COMPANY_WAITING, 10);
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		contract = createContract(companyId, storeId, Status.COMPANY_WAITING, 10);
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
		contract = createContract(companyId, storeId, ContractStatus.STORE_REQUEST, 10);
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
		contractRepository.save(contract);
	}

	@JtaTransactional
	@DisplayName("세금계산서를 업로드 한다.")
	@Test
	void upload_invoice_success() throws IOException {
		//given
		String contractId = contract.getId().toString();

		String fileName = "testImage1.png";
		String filePath =
			"C:\\Users\\SSAFY\\Desktop\\kkj\\Project\\SP2\\Project\\S11P21E201\\backend\\src\\test\\resources\\"
				+ fileName;
		FileInputStream fileInputStream = new FileInputStream(filePath);
		MockMultipartFile image = new MockMultipartFile(
			"image",
			fileName,
			IMAGE_PNG_VALUE,
			fileInputStream
		);

		//when
		InvoiceCreateResponse actual = sut.create(image, contractId);

		//then
		assertThat(actual).isNotNull();
	}

	@JtaTransactional
	@DisplayName("존재하지 않는 계약에 대한 세금계산서 업로드 시도 시 예외 발생한다.")
	@Test
	void upload_invoice_fail_contract_not_found() throws IOException {
		//given
		String contractId = UUID.randomUUID().toString();

		String fileName = "testImage1.png";
		String filePath =
			"C:\\Users\\SSAFY\\Desktop\\kkj\\Project\\SP2\\Project\\S11P21E201\\backend\\src\\test\\resources\\"
				+ fileName;
		FileInputStream fileInputStream = new FileInputStream(filePath);
		MockMultipartFile image = new MockMultipartFile(
			"image",
			fileName,
			IMAGE_PNG_VALUE,
			fileInputStream
		);

		//then
		assertThatThrownBy(() -> sut.create(image, contractId))
			.isInstanceOf(RuntimeException.class);
	}

	@DisplayName("파일저장에 실패하여 세금계산서 업로드를 실패한다.")
	@Test
	void uplaod_invoice_fail() throws IOException {
		//given
		MultipartFile multipartFile = mock(MultipartFile.class);
		when(multipartFile.getOriginalFilename()).thenReturn("testImage1.png");

		doThrow(new IOException("IOException")).when(multipartFile).transferTo(any(File.class));
		//expect
		assertThatThrownBy(() -> sut.create(multipartFile, contract.getId().toString())).isInstanceOf(
			RuntimeException.class);
	}

	@DisplayName("세금계산서를 다운로드 한다.")
	@Test
	void download_invoice_success() throws IOException {
		//given
		String filePath = "invoice" + File.separator + "e0e14738-956e-48aa-9c21-9d494ea1d4cb" + File.separator
			+ "ffeb122e-f9d4-4a7d-82de-f74b38e8fa20.png";
		Invoice invoice = createInvoice(filePath, contract);
		invoiceRepository.save(invoice);
		//when
		InvoiceDownloadResponse actual = sut.download(invoice.getId().toString());

		//then
		assertThat(actual).isNotNull();

	}

	@DisplayName("세금계산서 다운로드를 실패한다.")
	@Test
	void download_invoice_fail() {
		//given
		UUID invoice = UUID.randomUUID();

		//expect
		assertThatThrownBy(() -> sut.download(invoice.toString())).isInstanceOf(RuntimeException.class);
	}

	@DisplayName("세금계산서를 삭제 한다.")
	@Test
	void delete_invoice_success() {
		//given
		String filePath = "invoice" + File.separator + "e0e14738-956e-48aa-9c21-9d494ea1d4cb" + File.separator
			+ "ffeb122e-f9d4-4a7d-82de-f74b38e8fa20.png";
		Invoice invoice = createInvoice(filePath, contract);
		invoiceRepository.save(invoice);
		//when
		sut.delete(invoice.getId().toString());

		//then
		Invoice invoiceResult = invoiceRepository.findById(invoice.getId()).get();
		assertThat(invoiceResult).extracting("deleteYN").isEqualTo("Y");
	}

	@DisplayName("세금계산서 삭제를 실패한다.")
	@Test
	void delete_invoice_fail() {
		//given
		UUID invoice = UUID.randomUUID();

		//expect
		assertThatThrownBy(() -> sut.delete(invoice.toString())).isInstanceOf(RuntimeException.class);
	}

	@JtaTransactional
	@DisplayName("세금계산서(Entity)를 조회한다.")
	@Test
	void find_invoice_entity_success() {
		// given
		Invoice invoice = createInvoice("/img.jpg", contract);
		invoiceRepository.save(invoice);

		// when
		Invoice actual = sut.findEntity(invoice.getId());

		// then
		assertThat(actual.getImageUrl())
			.isEqualTo("/img.jpg");
	}

	@DisplayName("존재하지 않는 세금계산서(Entity)를 조회하면 예외가 발생한다.")
	@Test
	void find_invoice_entity_fail() {
		// expected
<<<<<<< HEAD
		assertThatThrownBy(() -> sut.findDomain(UUID.randomUUID())).isExactlyInstanceOf(RuntimeException.class);
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
=======
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate) {
>>>>>>> Stashed changes
=======
	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate){
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
>>>>>>> 6b9cc73 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	private Contract createContract(UUID companyId, UUID storeId, Status status, int sattlementDate){
>>>>>>> b57a788 ([#17] feat: 계약 생성, 수락, 삭제 기능 구현)
=======
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate){
>>>>>>> 81f23e0 ([#17] feat: soft Delete 관련 BaseEntity Method 추가)
=======
		assertThatThrownBy(() -> sut.findEntity(UUID.randomUUID())).isInstanceOf(RuntimeException.class);
	}

<<<<<<< HEAD
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDate) {
>>>>>>> b4d6ecc ([#17] feat: auth 인증 관련 내용 controller에 적용)
=======
	private Contract createContract(UUID companyId, UUID storeId, ContractStatus contractStatus, int settlementDay) {
>>>>>>> 32ca6e1 ([#17] refactor: 변수명, 함수 순서 일부 수정, Entity 삭제 메소드 명 변경)
		return Contract.builder()
			.companyId(companyId)
			.storeId(storeId)
			.status(contractStatus)
			.settlementDay(settlementDay)
			.build();
	}

	private Invoice createInvoice(String img_url, Contract contract) {
		return Invoice.builder()
			.contract(contract)
			.imageUrl(img_url)
			.build();
	}
}
