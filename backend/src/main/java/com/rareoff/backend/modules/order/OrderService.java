package com.rareoff.backend.modules.order;

import com.rareoff.backend.common.PageResponse;
import com.rareoff.backend.exception.BadRequestException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.modules.cart.Cart;
import com.rareoff.backend.modules.cart.CartItem;
import com.rareoff.backend.modules.cart.CartRepository;
import com.rareoff.backend.modules.order.dto.*;
import com.rareoff.backend.modules.product.Product;
import com.rareoff.backend.modules.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private static final DateTimeFormatter ORDER_DATE = DateTimeFormatter.ofPattern("yyyyMMdd").withZone(ZoneOffset.UTC);

    private final OrderRepository orderRepo;
    private final CartRepository cartRepo;
    private final ProductRepository productRepo;
    private final PricingProperties pricing;

    // ==================== CHECKOUT ====================
    @Transactional
    public OrderDto checkout(Long userId, CheckoutRequest req) {
        Cart cart = cartRepo.findByUserId(userId)
                .orElseThrow(() -> new BadRequestException("Cart is empty"));
        if (cart.getItems().isEmpty()) throw new BadRequestException("Cart is empty");

        // 1. Validate stock + lock prices
        for (CartItem ci : cart.getItems()) {
            Product p = ci.getProduct();
            if (!p.isActive()) throw new BadRequestException("Product unavailable: " + p.getName());
            if (p.getStock() < ci.getQuantity())
                throw new BadRequestException("Insufficient stock: " + p.getName());
        }

        // 2. Build order shell
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(cart.getUser())
                .status(OrderStatus.PENDING)
                .paymentStatus(req.paymentMethod() == PaymentMethod.COD
                        ? PaymentStatus.PENDING : PaymentStatus.PENDING)
                .paymentMethod(req.paymentMethod())
                .shipFullName(req.shippingAddress().fullName())
                .shipPhone(req.shippingAddress().phone())
                .shipLine1(req.shippingAddress().line1())
                .shipLine2(req.shippingAddress().line2())
                .shipCity(req.shippingAddress().city())
                .shipState(req.shippingAddress().state())
                .shipPincode(req.shippingAddress().pincode())
                .shipCountry(req.shippingAddress().country() == null ? "IN" : req.shippingAddress().country())
                .placedAt(Instant.now())
                .subtotal(BigDecimal.ZERO).shippingFee(BigDecimal.ZERO)
                .tax(BigDecimal.ZERO).discount(BigDecimal.ZERO).total(BigDecimal.ZERO)
                .build();

        // 3. Snapshot items + decrement stock
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CartItem ci : cart.getItems()) {
            Product p = ci.getProduct();
            String img = p.getImages().isEmpty() ? null : p.getImages().get(0).getUrl();
            BigDecimal lineTotal = ci.getPriceSnapshot().multiply(BigDecimal.valueOf(ci.getQuantity()));
            subtotal = subtotal.add(lineTotal);

            order.addItem(OrderItem.builder()
                    .product(p).nameSnapshot(p.getName()).skuSnapshot(p.getSku())
                    .imageSnapshot(img).priceSnapshot(ci.getPriceSnapshot())
                    .quantity(ci.getQuantity()).lineTotal(lineTotal).build());

            p.setStock(p.getStock() - ci.getQuantity());
            productRepo.save(p);
        }

        // 4. Pricing
        BigDecimal shipping = subtotal.compareTo(pricing.freeShippingOver()) >= 0
                ? BigDecimal.ZERO : pricing.shippingFee();
        BigDecimal tax = subtotal.multiply(pricing.taxRate()).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(shipping).add(tax);

        order.setSubtotal(subtotal);
        order.setShippingFee(shipping);
        order.setTax(tax);
        order.setTotal(total);

        order = orderRepo.save(order);

        // 5. Clear cart
        cart.getItems().clear();

        log.info("Order placed: {} userId={} total={}", order.getOrderNumber(), userId, total);
        return OrderDto.from(order);
    }

    // ==================== USER ====================
    @Transactional(readOnly = true)
    public PageResponse<OrderDto> listMine(Long userId, Pageable pageable) {
        return PageResponse.from(orderRepo.findByUserIdOrderByPlacedAtDesc(userId, pageable).map(OrderDto::from));
    }

    @Transactional(readOnly = true)
    public OrderDto getMine(Long userId, Long orderId) {
        return OrderDto.from(orderRepo.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> ResourceNotFoundException.of("Order", orderId)));
    }

    // ==================== ADMIN ====================
    @Transactional(readOnly = true)
    public PageResponse<OrderDto> listAll(OrderStatus status, Pageable pageable) {
        var spec = status == null ? null :
                (org.springframework.data.jpa.domain.Specification<Order>)
                        (r, q, cb) -> cb.equal(r.get("status"), status);
        return PageResponse.from(orderRepo.findAll(spec, pageable).map(OrderDto::from));
    }

    @Transactional(readOnly = true)
    public OrderDto getById(Long id) {
        return OrderDto.from(orderRepo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Order", id)));
    }

    @Transactional
    public OrderDto updateStatus(Long id, OrderStatus newStatus) {
        Order o = orderRepo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Order", id));
        o.setStatus(newStatus);
        if (newStatus == OrderStatus.CANCELLED || newStatus == OrderStatus.REFUNDED) {
            // restock
            for (OrderItem oi : o.getItems()) {
                Product p = oi.getProduct();
                p.setStock(p.getStock() + oi.getQuantity());
            }
            if (newStatus == OrderStatus.REFUNDED) o.setPaymentStatus(PaymentStatus.REFUNDED);
        }
        if (newStatus == OrderStatus.PAID) o.setPaymentStatus(PaymentStatus.PAID);
        return OrderDto.from(o);
    }

    // ---- helper ----
    private String generateOrderNumber() {
        String date = ORDER_DATE.format(Instant.now());
        for (int i = 0; i < 5; i++) {
            String candidate = "RO-" + date + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            if (!orderRepo.existsByOrderNumber(candidate)) return candidate;
        }
        throw new IllegalStateException("Could not generate unique order number");
    }
}
