package com.rareoff.backend.modules.cart.dto;

import com.rareoff.backend.modules.cart.Cart;

import java.math.BigDecimal;
import java.util.List;

public record CartDto(Long id, List<CartItemDto> items, int totalItems, BigDecimal totalPrice) {
    public static CartDto from(Cart c) {
        List<CartItemDto> items = c.getItems().stream().map(CartItemDto::from).toList();
        int count = items.stream().mapToInt(CartItemDto::quantity).sum();
        BigDecimal total = items.stream().map(CartItemDto::subtotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        return new CartDto(c.getId(), items, count, total);
    }
}
