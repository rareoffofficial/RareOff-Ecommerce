package com.rareoff.backend.modules.product;

import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public final class ProductSpecifications {
    private ProductSpecifications() {}

    public static Specification<Product> activeOnly() {
        return (r, q, cb) -> cb.isTrue(r.get("active"));
    }

    public static Specification<Product> categoryId(Long id) {
        return (r, q, cb) -> id == null ? cb.conjunction() : cb.equal(r.get("category").get("id"), id);
    }

    public static Specification<Product> search(String text) {
        if (text == null || text.isBlank()) return (r, q, cb) -> cb.conjunction();
        String p = "%" + text.toLowerCase() + "%";
        return (r, q, cb) -> cb.or(
                cb.like(cb.lower(r.get("name")), p),
                cb.like(cb.lower(r.get("brand")), p),
                cb.like(cb.lower(r.get("sku")), p));
    }

    public static Specification<Product> priceBetween(BigDecimal min, BigDecimal max) {
        return (r, q, cb) -> {
            if (min != null && max != null) return cb.between(r.get("price"), min, max);
            if (min != null) return cb.greaterThanOrEqualTo(r.get("price"), min);
            if (max != null) return cb.lessThanOrEqualTo(r.get("price"), max);
            return cb.conjunction();
        };
    }

    public static Specification<Product> featured(Boolean v) {
        return (r, q, cb) -> v == null ? cb.conjunction() : cb.equal(r.get("featured"), v);
    }

    public static Specification<Product> trending(Boolean v) {
        return (r, q, cb) -> v == null ? cb.conjunction() : cb.equal(r.get("trending"), v);
    }
}
