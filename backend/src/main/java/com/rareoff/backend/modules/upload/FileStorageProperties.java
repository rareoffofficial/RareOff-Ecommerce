package com.rareoff.backend.modules.upload;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rareoff.storage")
public record FileStorageProperties(String uploadDir, String publicBaseUrl) {}
