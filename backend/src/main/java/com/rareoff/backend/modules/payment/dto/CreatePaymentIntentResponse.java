package com.rareoff.backend.modules.payment.dto;

/**
 * Everything the Razorpay Checkout JS needs to open the payment widget.
 * `amount` is in the smallest currency unit (paise for INR).
 */
public record CreatePaymentIntentResponse(
        String razorpayOrderId,
        String keyId,
        String currency,
        long amount,
        String receipt
) {}
