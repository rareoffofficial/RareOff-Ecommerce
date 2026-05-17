package com.rareoff.backend.security;

import com.rareoff.backend.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {
    private SecurityUtils() {}

    /** Returns the current user's ID (set by JwtAuthFilter as the principal). */
    public static Long currentUserId() {
        Authentication a = SecurityContextHolder.getContext().getAuthentication();
        if (a == null || !(a.getPrincipal() instanceof Long id)) {
            throw new UnauthorizedException("Not authenticated");
        }
        return id;
    }
}
