package com.rareoff.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Central security wiring:
 *   - stateless sessions (we use JWT)
 *   - CSRF off (no browser sessions/cookies for state-changing endpoints in Phase 1)
 *   - public endpoints whitelisted
 *   - everything else requires authentication
 *   - JwtAuthFilter runs before the username/password filter
 *
 * @EnableMethodSecurity activates @PreAuthorize / @PostAuthorize on services & controllers.
 */
@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final RestAuthEntryPoint authEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;
    private final CustomUserDetailsService userDetailsService;

    // ---------- PASSWORD HASHING ----------
    @Bean
    public PasswordEncoder passwordEncoder() {
        // strength 12 ≈ 250ms per hash on modern hardware → painful for brute force, fine for users
        return new BCryptPasswordEncoder(12);
    }

    // ---------- AUTHENTICATION MANAGER ----------
    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder encoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }

    // ---------- FILTER CHAIN ----------
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // CorsFilter bean from CorsConfig is auto-picked
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(eh -> eh
                    .authenticationEntryPoint(authEntryPoint)
                    .accessDeniedHandler(accessDeniedHandler))
            .authorizeHttpRequests(auth -> auth
                    // public health & docs
                    .requestMatchers("/api/v1/ping",
                                     "/actuator/health",
                                     "/v3/api-docs/**",
                                     "/swagger-ui/**",
                                     "/swagger-ui.html",
                                     "/uploads/**").permitAll()
                    // auth endpoints (register/login/refresh) are open
                    .requestMatchers("/api/v1/auth/register",
                                     "/api/v1/auth/login",
                                     "/api/v1/auth/refresh",
                                     "/api/v1/payments/razorpay/webhook").permitAll()
                    // catalog reads are public (we'll register them next phase)
                    .requestMatchers("/api/v1/products/**",
                                     "/api/v1/categories/**").permitAll()
                    // admin area
                    .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                    // everything else requires a valid JWT
                    .anyRequest().authenticated())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
