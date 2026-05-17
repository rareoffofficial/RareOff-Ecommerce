package com.rareoff.backend.modules.auth.dto;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long accessExpiresInSeconds,
        UserDto user
) {
    public static AuthResponse of(String access, String refresh, long expSec, UserDto user) {
        return new AuthResponse(access, refresh, "Bearer", expSec, user);
    }
}
