package com.rareoff.backend.modules.order;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.math.BigDecimal;

@ConfigurationProperties(prefix = "rareoff.pricing")
public record PricingProperties(
        BigDecimal shippingFee,
        BigDecimal freeShippingOver,
        BigDecimal taxRate
) {}
