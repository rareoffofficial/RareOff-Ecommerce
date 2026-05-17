package com.rareoff.backend.security;

import com.rareoff.backend.modules.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;

/**
 * Owns ALL token operations:
 *  - issue / verify short-lived access JWTs (HS256, signed with secret)
 *  - generate cryptographically-strong opaque refresh tokens
 *  - hash refresh tokens (SHA-256) before persistence
 *
 * Beginner mental model:
 *   Access token  = a signed passport. Anyone can read it, no one can forge it.
 *   Refresh token = a long random secret. We only store its fingerprint (hash).
 */
@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String CLAIM_ROLES = "roles";
    private static final SecureRandom RNG = new SecureRandom();

    private final JwtProperties props;

    // ---------- KEY ----------

    private SecretKey signingKey() {
        // Secret must be ≥ 32 bytes for HS256. Configured via JWT_SECRET env var.
        return Keys.hmacShaKeyFor(props.secret().getBytes(StandardCharsets.UTF_8));
    }

    // ---------- ACCESS TOKEN ----------

    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        Instant exp = now.plus(Duration.ofMinutes(props.accessTtlMinutes()));

        List<String> roles = user.getRoles().stream()
                .map(r -> r.getName().name())
                .toList();

        return Jwts.builder()
                .subject(String.valueOf(user.getId()))
                .claim("email", user.getEmail())
                .claim(CLAIM_ROLES, roles)
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(signingKey())
                .compact();
    }

    public Claims parseAndValidate(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @SuppressWarnings("unchecked")
    public List<String> extractRoles(Claims claims) {
        Object raw = claims.get(CLAIM_ROLES);
        if (raw instanceof List<?> l) return (List<String>) l;
        return List.of();
    }

    public Long extractUserId(Claims claims) {
        return Long.valueOf(claims.getSubject());
    }

    // ---------- REFRESH TOKEN ----------

    /** 256-bit cryptographically secure random, URL-safe. Returned to client ONCE. */
    public String generateRefreshTokenRaw() {
        byte[] bytes = new byte[32];
        RNG.nextBytes(bytes);
        return HexFormat.of().formatHex(bytes);
    }

    /** SHA-256 hex. Persisted in DB; raw token is never stored. */
    public String hashRefreshToken(String raw) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(raw.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (Exception e) {
            throw new IllegalStateException("SHA-256 unavailable", e);
        }
    }

    public Instant refreshExpiry() {
        return Instant.now().plus(Duration.ofDays(props.refreshTtlDays()));
    }

    // ---------- HELPERS ----------

    public Map<String, Object> debugClaims(Claims c) {
        return Map.of("sub", c.getSubject(), "exp", c.getExpiration().toInstant().toString());
    }
}
