package com.e201;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TestController {

	private final TestService testService;

	// @GetMapping("/test")
	// public String test() {
	// 	return testService.test();
	// }
}
