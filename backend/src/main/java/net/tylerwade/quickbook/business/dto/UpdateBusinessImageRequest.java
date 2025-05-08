package net.tylerwade.quickbook.business.dto;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record UpdateBusinessImageRequest(
        @NotNull
        MultipartFile image
) {
}
