package net.tylerwade.quickbook.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(

        @NotBlank(message = "Current Password is required.")
        String currentPassword,

        @NotBlank(message = "New Password is required.")
        @Size(min = 6, max = 100, message = "New Password must be between 6 and 100 characters.")
        String newPassword,

        @NotBlank(message = "Confirm new Password is required.")
        String confirmNewPassword
) {

}
