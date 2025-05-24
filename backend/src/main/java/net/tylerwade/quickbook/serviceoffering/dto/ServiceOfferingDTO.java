package net.tylerwade.quickbook.serviceoffering.dto;

import java.sql.Timestamp;

public record ServiceOfferingDTO(
       Long id,
       String businessId,
       String name,
       String type,
       String description,
       String image,
       boolean enabled,
       boolean displayPublic,
       boolean allowPublic,
       Long priceInCents,
       Integer durationInMinutes,
       Timestamp createdAt
) {
}