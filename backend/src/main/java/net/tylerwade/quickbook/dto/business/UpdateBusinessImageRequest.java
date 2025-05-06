package net.tylerwade.quickbook.dto.business;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record UpdateBusinessImageRequest(
        @NotNull
        MultipartFile image
) {
}
