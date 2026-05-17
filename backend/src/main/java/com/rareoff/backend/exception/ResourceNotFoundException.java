package com.rareoff.backend.exception;

/** Thrown by services when a requested entity doesn't exist. -> HTTP 404 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException of(String entity, Object id) {
        return new ResourceNotFoundException("%s not found with id=%s".formatted(entity, id));
    }
}
