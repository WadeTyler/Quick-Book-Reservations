package net.tylerwade.quickbook.dto.auth;

public record SignupRequest(String username, String firstName, String lastName, String password, String confirmPassword) {
}
