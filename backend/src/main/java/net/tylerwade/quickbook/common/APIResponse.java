package net.tylerwade.quickbook.common;

public record APIResponse<T>(boolean isSuccess, String message, T data) {
}
