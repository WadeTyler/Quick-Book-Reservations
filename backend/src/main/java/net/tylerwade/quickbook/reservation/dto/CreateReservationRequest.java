package net.tylerwade.quickbook.reservation.dto;

import jakarta.validation.constraints.*;

import java.sql.Date;
import java.sql.Time;

public record CreateReservationRequest(
        @NotBlank(message = "First name is required.")
        @Size(min = 3, max = 100, message = "First name must be between 3 - 100 characters.")
        String firstName,

        @NotBlank(message = "Last name is required.")
        @Size(min = 3, max = 100, message = "Last name must be between 3 - 100 characters.")
        String lastName,

        @NotBlank(message = "Email name is required.")
        @Email(message = "Email must be valid")
        @Size(max = 255, message = "Email must be less than 255 characters.")
        String email,

        @NotBlank(message = "Phone number is required.")
        @Size(max = 20, message = "Phone number must be less than 20 characters.")
        String phoneNumber,

        @NotNull(message = "Date is required>")
        @FutureOrPresent(message = "Date must be in the future.")
        Date date,

        @NotNull(message = "Time is required")
        Time time
) {
}
