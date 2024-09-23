package com.e201.domain.entity.company;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ManagerTest {

	@DisplayName("관리자 비밀번호를 변경한다.")
	@Test
	void change_password() {
		// given
		String beforePassword = "12345678";
		String afterPassword = "87654321";
		Manager manager = createManager(beforePassword);

		// when
		manager.changePassword(afterPassword);

		//then
		assertThat(manager.getPassword()).isEqualTo(afterPassword);
	}

	private Manager createManager(String password) {
		return Manager.builder()
			.department(null)
			.code("관리자코드")
			.password(password)
			.build();
	}
}