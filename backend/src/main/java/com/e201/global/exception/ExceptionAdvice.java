package com.e201.global.exception;

import static com.e201.global.exception.ErrorCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.databind.exc.MismatchedInputException;

@RestControllerAdvice
public class ExceptionAdvice {

	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
		return createResponse(e, e.getErrorCode());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleInvalidParameterException(MethodArgumentNotValidException e) {
		return createResponse(e, INVALID_PARAMS);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> onHttpMessageNotReadable(HttpMessageNotReadableException e) {
		if (e.getCause() instanceof MismatchedInputException mismatchedInputException) {
			return ResponseEntity.badRequest()
				.body(new ErrorResponse(INVALID_PARAMS,
					mismatchedInputException.getPath().get(0).getFieldName() + " form is invalid"));
		}
		return ResponseEntity.badRequest()
			.body(new ErrorResponse(INVALID_PARAMS, "확인할 수 없는 형태의 데이터가 들어왔습니다"));
	}

	private ResponseEntity<ErrorResponse> createResponse(Exception e, ErrorCode errorCode) {
		ErrorResponse errorResponse = createErrorResponse(e, errorCode);
		return ResponseEntity
			.status(errorCode.getStatus())
			.body(errorResponse);
	}

	private static ErrorResponse createErrorResponse(Exception e, ErrorCode errorCode) {
		return ErrorResponse.builder()
			.code(errorCode)
			.message(e.getMessage())
			.build();
	}
}
