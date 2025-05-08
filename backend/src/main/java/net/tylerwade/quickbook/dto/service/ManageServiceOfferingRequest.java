package net.tylerwade.quickbook.dto.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record ManageServiceOfferingRequest(

        @NotBlank(message = "Name is required.")
        @Size(min = 3, max = 100, message = "Name must be between 3 - 100 characters.")
        String name,

        @NotBlank(message = "Type is required")
        @Size(min = 3, max = 100, message = "Type must be between 3 - 100 characters.")
        String type,

        @NotBlank(message = "Description is required.")
        @Size(min = 20, max = 500, message = "Description must be between 20 - 500 characters.")
        String description,

        MultipartFile image,

        boolean removeImage
) {
}
