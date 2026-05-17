package com.rareoff.backend.modules.payment;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.modules.order.dto.OrderDto;
import com.rareoff.backend.modules.payment.dto.CreatePaymentIntentRequest;
import com.rareoff.backend.modules.payment.dto.CreatePaymentIntentResponse;
import com.rareoff.backend.modules.payment.dto.VerifyPaymentRequest;
import com.rareoff.backend.security.SecurityUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/v1/payments/razorpay")
@RequiredArgsConstructor
@Tag(name = "Payments: Razorpay")
public class RazorpayController {

    private final PaymentService service;

    @PostMapping("/create-order")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<CreatePaymentIntentResponse> createOrder(
            @Valid @RequestBody CreatePaymentIntentRequest req) {
        return ApiResponse.ok(service.createIntent(SecurityUtils.currentUserId(), req.orderId()));
    }

    @PostMapping("/verify")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<OrderDto> verify(@Valid @RequestBody VerifyPaymentRequest req) {
        return ApiResponse.ok("Payment verified", service.verify(SecurityUtils.currentUserId(), req));
    }

    /** Razorpay → us. Body is verified via HMAC, no JWT required. */
    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(HttpServletRequest request,
                                        @RequestHeader("X-Razorpay-Signature") String signature) throws IOException {
        String rawBody = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        service.handleWebhook(rawBody, signature);
        return ResponseEntity.ok().build();
    }
}
