package net.tylerwade.quickbook.business.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateBusinessDetailsRequest(
        @NotBlank(message = "Name is required.")
        @Size(min = 3, max = 100, message = "Name must be between 3 - 100 characters.")
        String name,

        @NotBlank(message = "Description is required.")
        @Size(min = 20, max = 500, message = "Description must be between 20 - 500 characters.")
        String description) {

}
