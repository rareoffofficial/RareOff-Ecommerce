package com.rareoff.backend.modules.order.dto;

import com.rareoff.backend.modules.order.Order;
import com.rareoff.backend.modules.order.OrderStatus;
import com.rareoff.backend.modules.order.PaymentMethod;
import com.rareoff.backend.modules.order.PaymentStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderDto(
        Long id, String orderNumber, Long userId,
        BigDecimal subtotal, BigDecimal shippingFee, BigDecimal tax, BigDecimal discount, BigDecimal total,
        OrderStatus status, PaymentStatus paymentStatus, PaymentMethod paymentMethod,
        ShippingAddressDto shippingAddress,
        Instant placedAt, List<OrderItemDto> items
) {
    public static OrderDto from(Order o) {
        var ship = new ShippingAddressDto(o.getShipFullName(), o.getShipPhone(),
                o.getShipLine1(), o.getShipLine2(), o.getShipCity(),
                o.getShipState(), o.getShipPincode(), o.getShipCountry());
        return new OrderDto(o.getId(), o.getOrderNumber(), o.getUser().getId(),
                o.getSubtotal(), o.getShippingFee(), o.getTax(), o.getDiscount(), o.getTotal(),
                o.getStatus(), o.getPaymentStatus(), o.getPaymentMethod(),
                ship, o.getPlacedAt(),
                o.getItems().stream().map(OrderItemDto::from).toList());
    }
}
