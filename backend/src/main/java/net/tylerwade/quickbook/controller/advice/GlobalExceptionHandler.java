package net.tylerwade.quickbook.controller.advice;

import lombok.extern.slf4j.Slf4j;
import net.tylerwade.quickbook.config.AppProperties;
import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final AppProperties appProperties;

    public GlobalExceptionHandler(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    // HttpRequestException
    @ExceptionHandler(HttpRequestException.class)
    public ResponseEntity<?> handleHttpRequestException(HttpRequestException e) {
        printDebugMessage(e);
        return ResponseEntity.status(e.getHttpStatus()).body(new APIResponse<>(false, e.getMessage(), null));
    }

    // Catch all
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        printDebugMessage(e);
        return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new APIResponse<>(false, "Something unexpected happened. Try again later.", null));
    }

    // Utility function to print stack trace in not in production mode
    private void printDebugMessage(Exception e) {
        if (!appProperties.isProduction()) {
            log.error("Global Exception Caught: ", e);
        }
    }

}
