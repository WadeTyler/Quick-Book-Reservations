package net.tylerwade.quickbook.business.dto;

import java.sql.Timestamp;
import java.util.List;

public record BusinessDTO(
        String id,
        String ownerId,
        String name,
        String image,
        String description,
        Timestamp createdAt,
        List<String> staffIds,
        List<Long> serviceOfferingIds
) {
}
