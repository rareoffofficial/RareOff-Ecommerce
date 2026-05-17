package com.rareoff.backend.modules.order.dto;

import com.rareoff.backend.modules.order.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateOrderStatusRequest(@NotNull OrderStatus status) {}
