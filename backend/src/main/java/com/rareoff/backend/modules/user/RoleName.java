package com.rareoff.backend.modules.user;

/**
 * Type-safe enum mirroring the rows in the `roles` table.
 * Spring Security expects role authority strings to start with "ROLE_".
 */
public enum RoleName {
    ROLE_USER,
    ROLE_ADMIN
}
