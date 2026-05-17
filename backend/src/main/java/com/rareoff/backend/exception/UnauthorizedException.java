package com.rareoff.backend.exception;

/** 401 — bad credentials, invalid/expired token, revoked refresh. */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) { super(message); }
}
