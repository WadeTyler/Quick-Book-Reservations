package net.tylerwade.quickbook.auth.dto;

import java.sql.Timestamp;

public record UserDTO(String id, String username, String firstName, String lastName, Timestamp createdAt) {
}
