package com.rareoff.backend.modules.auth;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.exception.UnauthorizedException;
import com.rareoff.backend.modules.auth.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Registration, login, JWT refresh, logout")
public class AuthController {

    private final AuthService authService;

    // ---------- REGISTER ----------
    @PostMapping("/register")
    @Operation(summary = "Create a new user account and return tokens")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest req) {
        AuthResponse body = authService.register(req);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Registered", body));
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    @Operation(summary = "Authenticate with email + password, returns access & refresh tokens")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        return ApiResponse.ok("Login successful", authService.login(req));
    }

    // ---------- REFRESH ----------
    @PostMapping("/refresh")
    @Operation(summary = "Rotate refresh token, returns a fresh access + refresh pair")
    public ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshRequest req) {
        return ApiResponse.ok("Token refreshed", authService.refresh(req.refreshToken()));
    }

    // ---------- LOGOUT ----------
    @PostMapping("/logout")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Revoke the supplied refresh token")
    public ApiResponse<Void> logout(@RequestBody(required = false) RefreshRequest req) {
        authService.logout(req == null ? null : req.refreshToken());
        return ApiResponse.ok("Logged out", null);
    }

    // ---------- ME ----------
    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get the currently authenticated user")
    public ApiResponse<UserDto> me(Authentication auth) {
        if (auth == null || auth.getPrincipal() == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        Long userId = (Long) auth.getPrincipal();   // set by JwtAuthFilter
        return ApiResponse.ok(authService.getCurrentUser(userId));
    }
}
