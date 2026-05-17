package com.rareoff.backend.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

/**
 * Uniform JSON envelope returned by every controller.
 *
 * Shape:
 * {
 *   "success": true,
 *   "message": "OK",
 *   "data": { ... },
 *   "errorCode": null,
 *   "timestamp": "2026-05-17T10:00:00Z"
 * }
 *
 * Why an envelope? Consistent client parsing, easy to add tracing / pagination later.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        String message,
        T data,
        String errorCode,
        Instant timestamp
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, "OK", data, null, Instant.now());
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data, null, Instant.now());
    }

    public static <T> ApiResponse<T> error(String message, String errorCode) {
        return new ApiResponse<>(false, message, null, errorCode, Instant.now());
    }
}
