package com.rareoff.backend.modules.order;

import com.rareoff.backend.common.BaseEntity;
import com.rareoff.backend.modules.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "name_snapshot",  nullable = false, length = 200) private String nameSnapshot;
    @Column(name = "sku_snapshot",   nullable = false, length = 64)  private String skuSnapshot;
    @Column(name = "image_snapshot", length = 500) private String imageSnapshot;
    @Column(name = "price_snapshot", nullable = false, precision = 10, scale = 2) private BigDecimal priceSnapshot;

    @Column(nullable = false) private Integer quantity;
    @Column(name = "line_total", nullable = false, precision = 10, scale = 2) private BigDecimal lineTotal;
}
