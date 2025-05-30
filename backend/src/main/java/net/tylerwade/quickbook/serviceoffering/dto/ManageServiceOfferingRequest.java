package net.tylerwade.quickbook.serviceoffering.dto;

import jakarta.validation.constraints.*;
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
        boolean removeImage,

        boolean enabled,
        boolean displayPublic,
        boolean allowPublic,

        @NotNull(message = "Price is required.")
        @PositiveOrZero(message = "Price must be positive or zero.")
        @Max(value = 1000000, message = "A max of 1000000 cents is allowed.")
        Long priceInCents,

        @NotNull(message = "Duration is required.")
        @PositiveOrZero(message = "Duration must be positive or zero.")
        @Max(value = 1440, message = "Duration must be less than 24 hours.")
        Integer durationInMinutes
) {
}
