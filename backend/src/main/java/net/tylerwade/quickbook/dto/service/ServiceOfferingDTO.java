package net.tylerwade.quickbook.dto.service;

import java.sql.Timestamp;

public record ServiceOfferingDTO(
       Long id,
       String businessId,
       String name,
       String type,
       String description,
       String image,
       Timestamp createdAt
) {
}