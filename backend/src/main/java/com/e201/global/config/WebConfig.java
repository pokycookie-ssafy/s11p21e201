package com.e201.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins(
				"http://localhost:5173",
				"http://localhost:5174",
				"http://localhost:5175",
				"https://company.sanedaejangbu.site",
				"https://store.sanedaejangbu.site/",
				"https://employee.sanedaejangbu.site/",
				"https://admin.sanedaejangbu.site/",
				"https://sanedaejangbu.site/"
			)
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			.allowCredentials(true);
	}
}
