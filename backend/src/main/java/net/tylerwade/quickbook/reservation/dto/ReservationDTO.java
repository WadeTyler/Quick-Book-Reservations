package net.tylerwade.quickbook.reservation.dto;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

public record ReservationDTO(
        Long id,
        Long serviceOfferingId,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Date date,
        Time time,
        Timestamp createdAt
) {
}
