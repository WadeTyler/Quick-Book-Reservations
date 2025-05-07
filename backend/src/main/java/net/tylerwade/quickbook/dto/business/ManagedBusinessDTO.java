package net.tylerwade.quickbook.dto.business;

import net.tylerwade.quickbook.dto.auth.UserDTO;
import net.tylerwade.quickbook.dto.business.service.ServiceDTO;

import java.sql.Timestamp;
import java.util.List;

public record ManagedBusinessDTO(
        String id,
        String ownerId,
        String name,
        String image,
        String description,
        Timestamp createdAt,
        List<String> staffIds,
        UserDTO owner,
        List<UserDTO> staff,
        Long upcomingReservationCount,
        Integer servicesCount,
        List<ServiceDTO> services
) {
}
