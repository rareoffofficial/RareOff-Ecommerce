package com.rareoff.backend.exception;

/** Thrown for business-rule violations that aren't validation. -> HTTP 400 */
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
