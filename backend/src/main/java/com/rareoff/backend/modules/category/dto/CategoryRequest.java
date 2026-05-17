package com.rareoff.backend.modules.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
        @NotBlank @Size(max = 150) String name,
        @Size(max = 500) String imageUrl,
        Long parentId
) {}
