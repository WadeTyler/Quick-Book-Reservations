package net.tylerwade.quickbook.dto.business;

import net.tylerwade.quickbook.dto.auth.UserDTO;
import net.tylerwade.quickbook.dto.business.service.ServiceDTO;

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
        List<ServiceDTO> services
) {
}
