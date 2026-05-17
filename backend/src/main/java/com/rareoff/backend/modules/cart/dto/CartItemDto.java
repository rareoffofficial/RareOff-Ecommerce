package com.rareoff.backend.modules.cart.dto;

import com.rareoff.backend.modules.cart.CartItem;

import java.math.BigDecimal;

public record CartItemDto(
        Long id, Long productId, String name, String slug, String imageUrl,
        BigDecimal price, Integer quantity, BigDecimal subtotal
) {
    public static CartItemDto from(CartItem ci) {
        var p = ci.getProduct();
        String img = p.getImages().isEmpty() ? null : p.getImages().get(0).getUrl();
        BigDecimal sub = ci.getPriceSnapshot().multiply(BigDecimal.valueOf(ci.getQuantity()));
        return new CartItemDto(ci.getId(), p.getId(), p.getName(), p.getSlug(), img,
                ci.getPriceSnapshot(), ci.getQuantity(), sub);
    }
}
