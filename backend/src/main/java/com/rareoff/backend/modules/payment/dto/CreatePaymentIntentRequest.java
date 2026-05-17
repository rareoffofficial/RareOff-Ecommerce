package com.rareoff.backend.modules.payment.dto;

import jakarta.validation.constraints.NotNull;

public record CreatePaymentIntentRequest(@NotNull Long orderId) {}
