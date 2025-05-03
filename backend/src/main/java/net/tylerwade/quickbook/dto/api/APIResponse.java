package net.tylerwade.quickbook.dto.api;

public record APIResponse<T>(boolean isSuccess, String message, T data) {
}
