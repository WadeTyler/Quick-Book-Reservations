package net.tylerwade.quickbook.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.IOException;

public class HttpRequestException extends IOException {

    @Getter
    private final HttpStatus httpStatus;

    public HttpRequestException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpRequestException(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

}
