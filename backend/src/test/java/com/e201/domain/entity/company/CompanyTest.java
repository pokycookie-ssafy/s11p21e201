package com.e201.domain.entity.company;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CompanyTest {

	@DisplayName("기업 계정 비밀번호를 변경한다.")
	@Test
	void change_password() {
		// given
		String beforePassword = "12345678";
		String afterPassword = "87654321";
		Company company = createCompany(beforePassword);

		// when
		company.changePassword(afterPassword);

		//then
		assertThat(company.getPassword()).isEqualTo(afterPassword);
	}

	private Company createCompany(String password) {
		return Company.builder()
			.email("company@test.coom")
			.password(password)
			.companyInfo(null)
			.build();
	}
}