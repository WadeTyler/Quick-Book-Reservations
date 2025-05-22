package net.tylerwade.quickbook.business.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record CreateBusinessRequest(

        @NotBlank(message = "Abbreviation is required.")
        @Size(min = 3, max = 15, message = "Abbreviation must be between 3 - 15 characters.")
        @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Abbreviation must be alphanumeric")
        String id,

        @NotBlank(message = "Name is required.")
        @Size(min = 3, max = 100, message = "Name must be between 3 - 100 characters.")
        String name,

        MultipartFile image,

        @NotBlank(message = "Description is required.")
        @Size(min = 20, max = 500, message = "Description must be between 20 - 500 characters.")
        String description
) {
}
