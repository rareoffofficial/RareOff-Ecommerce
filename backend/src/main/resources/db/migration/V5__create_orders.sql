-- ============================================================
-- V5: Orders + Order Items (shipping address inlined for now)
-- ============================================================

CREATE TABLE orders (
    id                  BIGSERIAL      PRIMARY KEY,
    order_number        VARCHAR(40)    NOT NULL UNIQUE,
    user_id             BIGINT         NOT NULL REFERENCES users(id) ON DELETE RESTRICT,

    subtotal            NUMERIC(10,2)  NOT NULL,
    shipping_fee        NUMERIC(10,2)  NOT NULL DEFAULT 0,
    tax                 NUMERIC(10,2)  NOT NULL DEFAULT 0,
    discount            NUMERIC(10,2)  NOT NULL DEFAULT 0,
    total               NUMERIC(10,2)  NOT NULL,

    status              VARCHAR(32)    NOT NULL,   -- PENDING/PAID/SHIPPED/DELIVERED/CANCELLED/REFUNDED
    payment_status      VARCHAR(32)    NOT NULL,   -- PENDING/PAID/FAILED/REFUNDED
    payment_method      VARCHAR(32),

    ship_full_name      VARCHAR(150)   NOT NULL,
    ship_phone          VARCHAR(30)    NOT NULL,
    ship_line1          VARCHAR(255)   NOT NULL,
    ship_line2          VARCHAR(255),
    ship_city           VARCHAR(120)   NOT NULL,
    ship_state          VARCHAR(120)   NOT NULL,
    ship_pincode        VARCHAR(20)    NOT NULL,
    ship_country        VARCHAR(80)    NOT NULL DEFAULT 'IN',

    placed_at           TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    created_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_orders_user        ON orders(user_id, placed_at DESC);
CREATE INDEX idx_orders_status      ON orders(status);

CREATE TABLE order_items (
    id                BIGSERIAL      PRIMARY KEY,
    order_id          BIGINT         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id        BIGINT         NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    name_snapshot     VARCHAR(200)   NOT NULL,
    sku_snapshot      VARCHAR(64)    NOT NULL,
    image_snapshot    VARCHAR(500),
    price_snapshot    NUMERIC(10,2)  NOT NULL,
    quantity          INTEGER        NOT NULL CHECK (quantity > 0),
    line_total        NUMERIC(10,2)  NOT NULL,
    created_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_order_items_order ON order_items(order_id);
