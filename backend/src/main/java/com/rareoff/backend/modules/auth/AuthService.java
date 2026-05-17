package com.rareoff.backend.modules.auth;

import com.rareoff.backend.exception.ConflictException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.exception.UnauthorizedException;
import com.rareoff.backend.modules.auth.dto.*;
import com.rareoff.backend.modules.user.*;
import com.rareoff.backend.security.JwtProperties;
import com.rareoff.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * Single source of truth for all auth operations.
 * Controllers stay thin — they just delegate here.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final RefreshTokenRepository refreshRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JwtProperties jwtProps;
    private final AuthenticationManager authenticationManager;

    // ============================================================
    //                        REGISTER
    // ============================================================
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmailIgnoreCase(req.email())) {
            throw new ConflictException("Email already registered");
        }

        Role userRole = roleRepo.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new IllegalStateException("Seed role ROLE_USER missing"));

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User user = User.builder()
                .fullName(req.fullName())
                .email(req.email().toLowerCase())
                .passwordHash(passwordEncoder.encode(req.password()))
                .phone(req.phone())
                .enabled(true)
                .emailVerified(false)
                .roles(roles)
                .build();

        user = userRepo.save(user);
        log.info("New user registered id={} email={}", user.getId(), user.getEmail());

        return issueTokens(user);
    }

    // ============================================================
    //                          LOGIN
    // ============================================================
    @Transactional
    public AuthResponse login(LoginRequest req) {
        // Throws BadCredentialsException → mapped to 401 by GlobalExceptionHandler
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        User user = userRepo.findByEmailIgnoreCase(req.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!user.isEnabled()) {
            throw new UnauthorizedException("Account is disabled");
        }

        return issueTokens(user);
    }

    // ============================================================
    //                         REFRESH
    // ============================================================
    /**
     * Refresh-token rotation:
     *   - validate the incoming token
     *   - revoke it
     *   - issue a brand-new access + refresh pair
     * If a revoked refresh is ever reused, that's a red flag (token theft).
     */
    @Transactional
    public AuthResponse refresh(String rawRefreshToken) {
        String hash = jwtService.hashRefreshToken(rawRefreshToken);

        RefreshToken stored = refreshRepo.findByTokenHash(hash)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (stored.isRevoked()) {
            // Reuse of a revoked token → assume compromise, revoke ALL tokens for the user.
            refreshRepo.revokeAllForUser(stored.getUser());
            throw new UnauthorizedException("Refresh token reuse detected");
        }
        if (stored.getExpiresAt().isBefore(Instant.now())) {
            throw new UnauthorizedException("Refresh token expired");
        }

        // Rotate: revoke the used one, issue a new pair.
        stored.setRevoked(true);
        refreshRepo.save(stored);

        return issueTokens(stored.getUser());
    }

    // ============================================================
    //                          LOGOUT
    // ============================================================
    @Transactional
    public void logout(String rawRefreshToken) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) return;
        refreshRepo.findByTokenHash(jwtService.hashRefreshToken(rawRefreshToken))
                .ifPresent(rt -> { rt.setRevoked(true); refreshRepo.save(rt); });
    }

    // ============================================================
    //                           ME
    // ============================================================
    @Transactional(readOnly = true)
    public UserDto getCurrentUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        return UserDto.from(user);
    }

    // ============================================================
    //                       HELPERS
    // ============================================================
    private AuthResponse issueTokens(User user) {
        String accessToken  = jwtService.generateAccessToken(user);
        String refreshRaw   = jwtService.generateRefreshTokenRaw();
        String refreshHash  = jwtService.hashRefreshToken(refreshRaw);

        refreshRepo.save(RefreshToken.builder()
                .tokenHash(refreshHash)
                .user(user)
                .expiresAt(jwtService.refreshExpiry())
                .revoked(false)
                .build());

        long accessExpSec = jwtProps.accessTtlMinutes() * 60L;
        return AuthResponse.of(accessToken, refreshRaw, accessExpSec, UserDto.from(user));
    }
}
