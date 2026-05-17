package com.rareoff.backend.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Binds the rareoff.security.jwt.* block in application.yml to a typed POJO.
 * Beats sprinkling @Value across the codebase.
 */
@ConfigurationProperties(prefix = "rareoff.security.jwt")
public record JwtProperties(
        String secret,
        long accessTtlMinutes,
        long refreshTtlDays
) {}
