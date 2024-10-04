package com.e201.global.qr.config;

import static com.e201.api.service.qr.QRService.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.e201.api.controller.store.request.QRValidationRequest;
import com.e201.api.service.qr.QRService;
import com.e201.global.security.auth.constant.RoleType;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SchedulerConfiguration {
	private final QRService qrService;
	public static Map<String , LocalDateTime> qrMemory = new HashMap<>();
	public static final int TIME_DIFF = 90;
	@Scheduled(fixedDelay = TIME_DIFF * 1000)
	public void qrExpire(){ qrService.expire(); }
}
