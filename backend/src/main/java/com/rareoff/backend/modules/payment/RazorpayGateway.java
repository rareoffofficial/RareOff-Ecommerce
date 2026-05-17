package com.rareoff.backend.modules.payment;

import com.rareoff.backend.exception.BadRequestException;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

/**
 * Thin wrapper around the Razorpay SDK + HMAC verification helpers.
 * Fails fast at runtime if keys are missing instead of at startup, so the app boots
 * without Razorpay configured (useful for local dev and tests).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RazorpayGateway {

    private final RazorpayProperties props;
    private RazorpayClient client;

    @PostConstruct
    void init() {
        if (StringUtils.hasText(props.keyId()) && StringUtils.hasText(props.keySecret())) {
            try { client = new RazorpayClient(props.keyId(), props.keySecret()); }
            catch (RazorpayException e) { throw new IllegalStateException("Razorpay init failed", e); }
            log.info("Razorpay client initialised");
        } else {
            log.warn("Razorpay keys not configured — payment endpoints will return 400");
        }
    }

    public com.razorpay.Order createOrder(BigDecimal amount, String currency, String receipt) {
        require();
        try {
            JSONObject body = new JSONObject()
                    .put("amount",   amount.movePointRight(2).longValueExact())   // paise
                    .put("currency", currency)
                    .put("receipt",  receipt)
                    .put("payment_capture", 1);
            return client.orders.create(body);
        } catch (RazorpayException e) {
            throw new BadRequestException("Razorpay order creation failed: " + e.getMessage());
        }
    }

    public boolean verifyPaymentSignature(String orderId, String paymentId, String signature) {
        return hmacSha256(orderId + "|" + paymentId, props.keySecret()).equals(signature);
    }

    public boolean verifyWebhookSignature(String rawBody, String signature) {
        if (!StringUtils.hasText(props.webhookSecret())) return false;
        return hmacSha256(rawBody, props.webhookSecret()).equals(signature);
    }

    private void require() {
        if (client == null) throw new BadRequestException("Razorpay is not configured");
    }

    private static String hmacSha256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return HexFormat.of().formatHex(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new RuntimeException("HMAC computation failed", e);
        }
    }
}
