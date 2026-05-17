package com.rareoff.backend.modules.payment;

import com.rareoff.backend.exception.BadRequestException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.exception.UnauthorizedException;
import com.rareoff.backend.modules.order.Order;
import com.rareoff.backend.modules.order.OrderRepository;
import com.rareoff.backend.modules.order.OrderStatus;
import com.rareoff.backend.modules.order.PaymentStatus;
import com.rareoff.backend.modules.order.dto.OrderDto;
import com.rareoff.backend.modules.payment.dto.CreatePaymentIntentResponse;
import com.rareoff.backend.modules.payment.dto.VerifyPaymentRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final RazorpayGateway gateway;
    private final RazorpayProperties props;
    private final OrderRepository orderRepo;
    private final PaymentRepository paymentRepo;

    // ---------- CREATE INTENT ----------
    @Transactional
    public CreatePaymentIntentResponse createIntent(Long userId, Long orderId) {
        Order o = orderRepo.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> ResourceNotFoundException.of("Order", orderId));
        if (o.getPaymentStatus() == PaymentStatus.PAID)
            throw new BadRequestException("Order already paid");

        com.razorpay.Order rzpOrder = gateway.createOrder(o.getTotal(), props.currency(), o.getOrderNumber());
        String rzpOrderId = rzpOrder.get("id");

        paymentRepo.save(Payment.builder()
                .order(o).provider("RAZORPAY")
                .providerOrderId(rzpOrderId)
                .amount(o.getTotal()).currency(props.currency())
                .status("CREATED").rawResponse(rzpOrder.toString())
                .build());

        long amountPaise = o.getTotal().movePointRight(2).longValueExact();
        return new CreatePaymentIntentResponse(
                rzpOrderId, props.keyId(), props.currency(), amountPaise, o.getOrderNumber());
    }

    // ---------- VERIFY ----------
    @Transactional
    public OrderDto verify(Long userId, VerifyPaymentRequest req) {
        Payment payment = paymentRepo.findByProviderOrderId(req.razorpayOrderId())
                .orElseThrow(() -> ResourceNotFoundException.of("Payment", req.razorpayOrderId()));

        if (!payment.getOrder().getUser().getId().equals(userId))
            throw new UnauthorizedException("Not your payment");

        boolean ok = gateway.verifyPaymentSignature(
                req.razorpayOrderId(), req.razorpayPaymentId(), req.razorpaySignature());

        if (!ok) {
            payment.setStatus("FAILED");
            throw new BadRequestException("Invalid payment signature");
        }

        payment.setProviderPaymentId(req.razorpayPaymentId());
        payment.setProviderSignature(req.razorpaySignature());
        payment.setStatus("VERIFIED");

        Order o = payment.getOrder();
        o.setPaymentStatus(PaymentStatus.PAID);
        o.setStatus(OrderStatus.PAID);

        log.info("Payment verified: order={} rzpPayment={}", o.getOrderNumber(), req.razorpayPaymentId());
        return OrderDto.from(o);
    }

    // ---------- WEBHOOK ----------
    @Transactional
    public void handleWebhook(String rawBody, String signature) {
        if (!gateway.verifyWebhookSignature(rawBody, signature))
            throw new UnauthorizedException("Invalid webhook signature");

        log.info("Razorpay webhook OK: {} chars", rawBody.length());
        // Optional: parse rawBody → update order/payment status as a redundancy net.
        // The /verify call is the primary source of truth.
    }
}
