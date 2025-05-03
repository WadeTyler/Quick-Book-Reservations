package net.tylerwade.quickbook.util;

import net.tylerwade.quickbook.dto.auth.SignupRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.http.HttpStatus;

import static com.google.common.base.Strings.isNullOrEmpty;

public class AuthUtil {

    public static void validateSignupRequest(SignupRequest signupRequest) throws HttpRequestException {
        // Validate signup request
        if (isNullOrEmpty(signupRequest.username()) ||
                isNullOrEmpty(signupRequest.firstName()) ||
                isNullOrEmpty(signupRequest.lastName()) ||
                isNullOrEmpty(signupRequest.password()) ||
                isNullOrEmpty(signupRequest.confirmPassword())) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "All fields required: Email, First Name, Last Name, Password, Confirm Password.");
        }

        String username = signupRequest.username();
        String firstName = signupRequest.firstName();
        String lastName = signupRequest.lastName();
        String password = signupRequest.password();
        String confirmPassword = signupRequest.confirmPassword();

        if (username.length() < 3 || username.length() > 255) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Email must be between 3 - 5 characters.");
        }

        if (firstName.length() < 3 || firstName.length() > 255) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "First Name must be between 3 - 5 characters.");
        }

        if (lastName.length() < 3 || lastName.length() > 255) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Last Name must be between 3 - 5 characters.");
        }

        if (password.length() < 6 || password.length() > 75) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Password must be between 6 - 75 characters.");
        }

        if (!confirmPassword.equals(password)) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Passwords must match.");
        }
    }

}
