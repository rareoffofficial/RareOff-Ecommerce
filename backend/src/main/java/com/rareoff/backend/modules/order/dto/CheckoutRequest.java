package com.rareoff.backend.modules.order.dto;

import com.rareoff.backend.modules.order.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record CheckoutRequest(
        @Valid @NotNull ShippingAddressDto shippingAddress,
        @NotNull PaymentMethod paymentMethod
) {}
