package com.rareoff.backend.modules.product.dto;

import com.rareoff.backend.modules.product.ProductImage;

public record ProductImageDto(Long id, String url, int position, boolean primary) {
    public static ProductImageDto from(ProductImage i) {
        return new ProductImageDto(i.getId(), i.getUrl(), i.getPosition(), i.isPrimary());
    }
}
