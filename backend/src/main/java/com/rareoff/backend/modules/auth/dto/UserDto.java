package com.rareoff.backend.modules.auth.dto;

import com.rareoff.backend.modules.user.User;

import java.util.Set;
import java.util.stream.Collectors;

public record UserDto(
        Long id,
        String fullName,
        String email,
        String phone,
        boolean emailVerified,
        Set<String> roles
) {
    public static UserDto from(User u) {
        return new UserDto(
                u.getId(),
                u.getFullName(),
                u.getEmail(),
                u.getPhone(),
                u.isEmailVerified(),
                u.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toSet())
        );
    }
}
