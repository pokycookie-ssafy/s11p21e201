package com.e201.api.service.contract;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

	@Value("${spring.servlet.multipart.location}")
	private String path;

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

	// @JtaTransactional
	// @DisplayName("세금계산서를 업로드 한다.")
	// @Test
	// void upload_invoice_success() throws IOException {
	// 	//given
	// 	String contractId = contract.getId().toString();
	//
	// 	MockMultipartFile image = new MockMultipartFile(
	// 		"image",
	// 		"image.png",
	// 		IMAGE_PNG_VALUE,
	// 		"image.png".getBytes()
	// 	);
	//
	// 	//when
	// 	InvoiceCreateResponse actual = sut.create(image, contractId);
	//
	// 	//then
	// 	assertThat(actual).isNotNull();
	// }
	//
	// @JtaTransactional
	// @DisplayName("존재하지 않는 계약에 대한 세금계산서 업로드 시도 시 예외 발생한다.")
	// @Test
	// void upload_invoice_fail_contract_not_found() throws IOException {
	// 	//given
	// 	String contractId = UUID.randomUUID().toString();
	//
	// 	MockMultipartFile image = new MockMultipartFile(
	// 		"image",
	// 		"image.png",
	// 		IMAGE_PNG_VALUE,
	// 		"image.png".getBytes()
	// 	);
	//
	// 	//then
	// 	assertThatThrownBy(() -> sut.create(image, contractId))
	// 		.isInstanceOf(RuntimeException.class);
	// }
	//
	// @JtaTransactional
	// @DisplayName("파일저장에 실패하여 세금계산서 업로드를 실패한다.")
	// @Test
	// void uplaod_invoice_fail() throws IOException {
	// 	//given
	// 	MultipartFile multipartFile = mock(MultipartFile.class);
	// 	when(multipartFile.getOriginalFilename()).thenReturn("testImage1.png");
	//
	// 	doThrow(new IOException("IOException")).when(multipartFile).transferTo(any(File.class));
	// 	//expect
	// 	assertThatThrownBy(() -> sut.create(multipartFile, contract.getId().toString())).isInstanceOf(
	// 		RuntimeException.class);
	// }

	@JtaTransactional
	@DisplayName("세금계산서를 다운로드 한다.")
	@Test
	void download_invoice_success() throws IOException {
		//given
		String contractId = contract.getId().toString();

		MockMultipartFile image = new MockMultipartFile(
			"image",
			"image.png",
			IMAGE_PNG_VALUE,
			"image.png".getBytes()
		);

		String savePath = "invoice" + File.separator + contractId + File.separator;
		File dir = new File(path + savePath);
		if (!dir.exists())
			dir.mkdirs();

		// 확장자 추출
		String originalFilename = image.getOriginalFilename();
		String ext = originalFilename.substring(originalFilename.lastIndexOf("."));

		// 신규 파일 생성
		String newFileName = savePath + UUID.randomUUID().toString() + ext;
		File newfile = new File(path + newFileName);

		try {
			image.transferTo(newfile);
		} catch (IOException e) {
			throw new RuntimeException("failed to upload file");
		}

		Invoice invoice = createInvoice(newFileName, contract);
		invoiceRepository.save(invoice);

		//when
		InvoiceDownloadResponse actual = sut.download(invoice.getId().toString());

		//then
		assertThat(actual).isNotNull();

		Files.deleteIfExists(Paths.get(path + newFileName));
		Files.deleteIfExists(Paths.get(path + savePath));
	}

	@JtaTransactional
	@DisplayName("세금계산서 다운로드를 실패한다.")
	@Test
	void download_invoice_fail() {
		//given
		UUID invoice = UUID.randomUUID();

		//expect
		assertThatThrownBy(() -> sut.download(invoice.toString())).isInstanceOf(RuntimeException.class);
	}

	@JtaTransactional
	@DisplayName("세금계산서를 삭제 한다.")
	@Test
	void delete_invoice_success() {
		//given
		Invoice invoice = createInvoice("/img.jpg", contract);
		invoiceRepository.save(invoice);

		String invoiceId = invoice.getId().toString();
		//when
		sut.delete(invoiceId);

		//then
		Invoice invoiceResult = invoiceRepository.findById(UUID.fromString(invoiceId)).get();
		assertThat(invoiceResult).extracting("deleteYN").isEqualTo("Y");
	}

	@JtaTransactional
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