package com.e201.api.service.contract;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.e201.api.controller.contract.response.InvoiceCreateResponse;
import com.e201.api.controller.contract.response.InvoiceDownloadResponse;
import com.e201.domain.annotation.JtaTransactional;
import com.e201.domain.entity.contract.Contract;
import com.e201.domain.entity.contract.Invoice;
import com.e201.domain.entity.payment.PaymentMonthlySum;
import com.e201.domain.repository.contract.ContractRepository;
import com.e201.domain.repository.contract.InvoiceRepository;
import com.e201.domain.repository.payment.PaymentMonthlySumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceService {

	private final InvoiceRepository invoiceRepository;
	private final ContractRepository contractRepository;
	private final PaymentMonthlySumRepository paymentMonthlySumRepository;

	@Value("${spring.servlet.multipart.location}")
	private String path;

	@JtaTransactional
	public InvoiceCreateResponse create(MultipartFile uploadFile, UUID settlement_id) {
		PaymentMonthlySum paymentMonthlySum = paymentMonthlySumRepository.findById(settlement_id)
			.orElseThrow(() -> new RuntimeException("not found exception"));

		Contract contract = contractRepository.findById(paymentMonthlySum.getContractId())
			.orElseThrow(() -> new RuntimeException("not found exception"));

		String imageUrl = fileUpload(uploadFile, contract.getId().toString());

		Invoice invoice = Invoice.builder()
			.contract(contract)
			.imageUrl(imageUrl).build();

		invoiceRepository.save(invoice);

		paymentMonthlySum.updateInvoiceId(invoice.getId());

		return new InvoiceCreateResponse(contract.getId());
	}

	public Invoice findEntity(UUID id) {
		return invoiceRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("not found exception"));
	}

	public InvoiceDownloadResponse download(UUID settlementId) throws IOException {
		PaymentMonthlySum settlement = paymentMonthlySumRepository.findById(settlementId)
			.orElseThrow(() -> new RuntimeException("not found exception"));

		Invoice invoice = invoiceRepository.findById(settlement.getInvoiceId())
			.orElseThrow(() -> new RuntimeException("not found exception"));

		Path invoiceFile = Paths.get(path + invoice.getImageUrl());

		String contentType = Files.probeContentType(invoiceFile);
		Resource resource = new InputStreamResource(Files.newInputStream(invoiceFile));

		return new InvoiceDownloadResponse(resource, contentType, invoiceFile.getFileName().toString());
	}

	@JtaTransactional
	public void delete(String invoiceId) {
		Invoice invoice = findEntity(UUID.fromString(invoiceId));
		invoice.softDelete();
	}

	private String fileUpload(MultipartFile uploadFile, String contractId) {
		String savePath = "invoice" + File.separator + contractId + File.separator;
		File dir = new File(path + savePath);
		if (!dir.exists())
			dir.mkdirs();

		// 확장자 추출
		String originalFilename = uploadFile.getOriginalFilename();
		String ext = originalFilename.substring(originalFilename.lastIndexOf("."));

		// 신규 파일 생성
		String newFileName = savePath + UUID.randomUUID().toString() + ext;
		File newfile = new File(path + newFileName);

		try {
			uploadFile.transferTo(newfile);
		} catch (IOException e) {
			throw new RuntimeException("failed to upload file");
		}

		return newFileName;
	}
}
