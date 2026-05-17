package com.rareoff.backend.health;

import com.rareoff.backend.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Lightweight ping endpoint to verify the app + envelope are wired correctly.
 * Real liveness/readiness probes come from Spring Actuator (/actuator/health).
 */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health", description = "Service ping")
public class HealthController {

    @GetMapping("/ping")
    @Operation(summary = "Ping the API")
    public ApiResponse<Map<String, String>> ping() {
        return ApiResponse.ok(Map.of(
                "service", "rareoff-backend",
                "status",  "UP"
        ));
    }
}
