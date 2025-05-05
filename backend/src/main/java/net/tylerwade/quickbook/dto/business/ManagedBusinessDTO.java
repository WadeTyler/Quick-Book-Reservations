package net.tylerwade.quickbook.dto.business;

import net.tylerwade.quickbook.model.User;

import java.sql.Timestamp;
import java.util.List;

public record ManagedBusinessDTO(String id, String ownerId, String name, String image, String description, Timestamp createdAt, List<String> staffIds, User owner, List<User> staff, Long upcomingReservationCount, Integer servicesCount) {
}
