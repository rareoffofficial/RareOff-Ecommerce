package com.rareoff.backend.modules.product.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequest(
        @NotBlank @Size(max = 64)  String sku,
        @NotBlank @Size(max = 200) String name,
        String description,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @DecimalMin("0.0") BigDecimal compareAtPrice,
        @NotNull @Min(0) Integer stock,
        Long categoryId,
        @Size(max = 120) String brand,
        @Size(max = 120) String material,
        Boolean active,
        Boolean featured,
        Boolean trending,
        List<@NotBlank String> imageUrls
) {}
