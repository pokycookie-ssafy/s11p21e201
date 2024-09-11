package com.e201.global.db.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import com.atomikos.spring.AtomikosDataSourceBean;

public class JtaDataSourceUtil {
	public static DataSource of(String driverClassName, String url, String username, String password) {
		AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
		atomikosDataSourceBean.setXaDataSourceClassName(driverClassName);

		Properties properties = new Properties();
		properties.setProperty("url", url);
		properties.setProperty("user", username);
		properties.setProperty("password", password);
		atomikosDataSourceBean.setXaProperties(properties);
		return atomikosDataSourceBean;
	}
}
