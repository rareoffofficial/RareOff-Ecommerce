package com.rareoff.backend.exception;

/** Thrown when state conflicts (e.g. duplicate email). -> HTTP 409 */
public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
