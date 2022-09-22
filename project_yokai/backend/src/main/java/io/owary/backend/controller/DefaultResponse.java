package io.owary.backend.controller;

public record DefaultResponse(
        int statusCode,
        String message,
        Object data
) {
}
