package net.tylerwade.quickbook.exception;

import lombok.extern.slf4j.Slf4j;
import net.tylerwade.quickbook.config.AppProperties;
import net.tylerwade.quickbook.common.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import static org.springframework.http.HttpStatus.*;


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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        printDebugMessage(e);

        // Build message
        StringBuilder errors = new StringBuilder();

        for (int i = 0; i < e.getBindingResult().getAllErrors().size(); i++) {
            errors.append(e.getBindingResult().getAllErrors().get(i).getDefaultMessage());
            if (i != e.getBindingResult().getAllErrors().size() - 1) {
                errors.append("\n");
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIResponse<>(false, errors.toString(), null));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMaxUploadSizeExceedException(MaxUploadSizeExceededException e) {
        printDebugMessage(e);

        return ResponseEntity.status(PAYLOAD_TOO_LARGE).body(
                new APIResponse<>(false, "The file you are attempting to upload is too large. Max Upload Size: " + appProperties.maxUploadSizeMb() + "MB.", null)
        );
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
