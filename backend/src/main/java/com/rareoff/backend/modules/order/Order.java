package com.rareoff.backend.modules.order;

import com.rareoff.backend.common.BaseEntity;
import com.rareoff.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 40)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal subtotal;
    @Column(name = "shipping_fee", nullable = false, precision = 10, scale = 2) private BigDecimal shippingFee;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal tax;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal discount;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal total;

    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 32)
    private OrderStatus status;

    @Enumerated(EnumType.STRING) @Column(name = "payment_status", nullable = false, length = 32)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING) @Column(name = "payment_method", length = 32)
    private PaymentMethod paymentMethod;

    // ---- shipping address (inlined) ----
    @Column(name = "ship_full_name", nullable = false, length = 150) private String shipFullName;
    @Column(name = "ship_phone",     nullable = false, length = 30)  private String shipPhone;
    @Column(name = "ship_line1",     nullable = false, length = 255) private String shipLine1;
    @Column(name = "ship_line2",     length = 255) private String shipLine2;
    @Column(name = "ship_city",      nullable = false, length = 120) private String shipCity;
    @Column(name = "ship_state",     nullable = false, length = 120) private String shipState;
    @Column(name = "ship_pincode",   nullable = false, length = 20)  private String shipPincode;
    @Column(name = "ship_country",   nullable = false, length = 80)  @Builder.Default private String shipCountry = "IN";

    @Column(name = "placed_at", nullable = false) @Builder.Default
    private Instant placedAt = Instant.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    public void addItem(OrderItem item) { item.setOrder(this); items.add(item); }
}
