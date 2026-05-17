package com.rareoff.backend.modules.product.dto;

import com.rareoff.backend.modules.product.Product;

import java.math.BigDecimal;
import java.util.List;

public record ProductDto(
        Long id, String sku, String name, String slug, String description,
        BigDecimal price, BigDecimal compareAtPrice, Integer stock,
        Long categoryId, String categoryName,
        String brand, String material,
        boolean active, boolean featured, boolean trending,
        List<ProductImageDto> images
) {
    public static ProductDto from(Product p) {
        return new ProductDto(
                p.getId(), p.getSku(), p.getName(), p.getSlug(), p.getDescription(),
                p.getPrice(), p.getCompareAtPrice(), p.getStock(),
                p.getCategory() == null ? null : p.getCategory().getId(),
                p.getCategory() == null ? null : p.getCategory().getName(),
                p.getBrand(), p.getMaterial(),
                p.isActive(), p.isFeatured(), p.isTrending(),
                p.getImages().stream().map(ProductImageDto::from).toList()
        );
    }
}
