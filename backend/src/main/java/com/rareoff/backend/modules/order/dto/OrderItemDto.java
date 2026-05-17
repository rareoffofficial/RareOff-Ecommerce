package com.rareoff.backend.modules.order.dto;

import com.rareoff.backend.modules.order.OrderItem;

import java.math.BigDecimal;

public record OrderItemDto(
        Long id, Long productId, String name, String sku, String image,
        BigDecimal price, Integer quantity, BigDecimal lineTotal
) {
    public static OrderItemDto from(OrderItem i) {
        return new OrderItemDto(i.getId(), i.getProduct().getId(),
                i.getNameSnapshot(), i.getSkuSnapshot(), i.getImageSnapshot(),
                i.getPriceSnapshot(), i.getQuantity(), i.getLineTotal());
    }
}
