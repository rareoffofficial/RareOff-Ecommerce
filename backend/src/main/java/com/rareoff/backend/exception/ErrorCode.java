package com.rareoff.backend.exception;

/**
 * Stable machine-readable error codes returned to clients.
 * Frontend can switch on these instead of parsing human messages.
 */
public final class ErrorCode {

    private ErrorCode() {}

    public static final String VALIDATION_FAILED   = "VALIDATION_FAILED";
    public static final String RESOURCE_NOT_FOUND  = "RESOURCE_NOT_FOUND";
    public static final String BAD_REQUEST         = "BAD_REQUEST";
    public static final String CONFLICT            = "CONFLICT";
    public static final String UNAUTHORIZED        = "UNAUTHORIZED";
    public static final String FORBIDDEN           = "FORBIDDEN";
    public static final String INTERNAL_ERROR      = "INTERNAL_ERROR";
}
