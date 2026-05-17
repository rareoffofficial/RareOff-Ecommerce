package com.rareoff.backend.modules.payment;

import com.rareoff.backend.common.BaseEntity;
import com.rareoff.backend.modules.order.Order;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "payments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Payment extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false, length = 32)
    private String provider;                 // "RAZORPAY"

    @Column(name = "provider_order_id",   length = 120) private String providerOrderId;
    @Column(name = "provider_payment_id", length = 120) private String providerPaymentId;
    @Column(name = "provider_signature",  length = 255) private String providerSignature;

    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal amount;
    @Column(nullable = false, length = 8) private String currency;

    @Column(nullable = false, length = 32)
    private String status;                   // CREATED / VERIFIED / FAILED

    @Column(name = "raw_response", columnDefinition = "TEXT")
    private String rawResponse;
}
