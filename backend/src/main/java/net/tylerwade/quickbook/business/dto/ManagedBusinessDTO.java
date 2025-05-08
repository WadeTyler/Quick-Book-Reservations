package net.tylerwade.quickbook.business.dto;

import net.tylerwade.quickbook.auth.dto.UserDTO;
import net.tylerwade.quickbook.serviceoffering.dto.ServiceOfferingDTO;

import java.sql.Timestamp;
import java.util.List;

public record ManagedBusinessDTO(
        String id,
        String name,
        String image,
        String description,
        Timestamp createdAt,
        UserDTO owner,
        List<UserDTO> staff,
        Long upcomingReservationCount,
        List<ServiceOfferingDTO> serviceOfferings
) {
}
