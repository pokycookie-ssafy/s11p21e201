package com.e201.domain.entity.company;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class EmployeeTest {

	@DisplayName("직원 비밀번호를 변경한다.")
	@Test
	void change_password() {
		// given
		String beforePassword = "12345678";
		String afterPassword = "87654321";
		Employee employee = createEmployee(beforePassword);

		// when
		employee.changePassword(afterPassword);

		//then
		assertThat(employee.getPassword()).isEqualTo(afterPassword);
	}

	private Employee createEmployee(String password) {
		return Employee.builder()
			.department(null)
			.code("직원코드")
			.password(password)
			.build();
	}
}