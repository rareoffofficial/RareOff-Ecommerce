package com.rareoff.backend.modules.category.dto;

import com.rareoff.backend.modules.category.Category;

public record CategoryDto(Long id, String name, String slug, String imageUrl, Long parentId) {
    public static CategoryDto from(Category c) {
        return new CategoryDto(
                c.getId(), c.getName(), c.getSlug(), c.getImageUrl(),
                c.getParent() == null ? null : c.getParent().getId());
    }
}
