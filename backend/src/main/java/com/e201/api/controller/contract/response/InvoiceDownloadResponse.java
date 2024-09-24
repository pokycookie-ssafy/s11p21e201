package com.e201.api.controller.contract.response;

import org.springframework.core.io.Resource;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InvoiceDownloadResponse {

	private Resource resource;
	private String contentType;
	private String fileName;

	public InvoiceDownloadResponse(Resource resource, String contentType, String fileName) {
		this.resource = resource;
		this.contentType = contentType;
		this.fileName = fileName;
	}
}
