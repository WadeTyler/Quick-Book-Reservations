package net.tylerwade.quickbook.business.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record StaffManagementDTO(
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    String email
) {
}