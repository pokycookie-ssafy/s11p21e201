package com.e201.api.service.qr;

import static com.e201.global.qr.config.SchedulerConfiguration.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.e201.api.controller.store.request.QRValidationRequest;
import com.e201.global.security.auth.constant.RoleType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class QRService {

	// qr 생성하는 메소드
	public void create(RoleType roleType, QRValidationRequest qrValidationRequest) {
		validationAuth(roleType);
		qrMemory.put(qrValidationRequest.getValidationId(), LocalDateTime.now());
	}

	//qr 결제시 inmemory를 확인하는 메소드
	public boolean isExist(QRValidationRequest qrValidationRequest) {
		return qrMemory.containsKey(qrValidationRequest.getValidationId());
	}

	// 일정 기간이 지나면 map에서 qrId 삭제
	public void expire() {
		LocalDateTime now = LocalDateTime.now();
		Iterator<Map.Entry<String, LocalDateTime>> iterator = qrMemory.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry<String, LocalDateTime> entry = iterator.next();
			if (isDifference(entry.getValue(), now)) {
				iterator.remove();
			}
		}
	}

	public static boolean isDifference(LocalDateTime pre, LocalDateTime now) {
		Duration duration = Duration.between(pre, now);
		return duration.getSeconds() >= TIME_DIFF;
	}


	//roleType validation
	private void validationAuth(RoleType roleType){
		if(roleType!=RoleType.EMPLOYEE){
			throw new RuntimeException("invalid role type");
		}
	}
}
