package com.rareoff.backend.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank @Size(max = 150)
        String fullName,

        @NotBlank @Email @Size(max = 190)
        String email,

        @NotBlank
        @Size(min = 8, max = 72, message = "Password must be 8-72 characters")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
                message = "Password must contain a letter and a number")
        String password,

        @Size(max = 30)
        String phone
) {}
