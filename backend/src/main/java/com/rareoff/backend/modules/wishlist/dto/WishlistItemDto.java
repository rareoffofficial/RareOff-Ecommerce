package com.rareoff.backend.modules.wishlist.dto;

import com.rareoff.backend.modules.wishlist.WishlistItem;

import java.math.BigDecimal;

public record WishlistItemDto(
        Long id, Long productId, String name, String slug, String imageUrl, BigDecimal price
) {
    public static WishlistItemDto from(WishlistItem w) {
        var p = w.getProduct();
        String img = p.getImages().isEmpty() ? null : p.getImages().get(0).getUrl();
        return new WishlistItemDto(w.getId(), p.getId(), p.getName(), p.getSlug(), img, p.getPrice());
    }
}
