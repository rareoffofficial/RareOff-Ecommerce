-- ============================================================
-- V4: Cart & Wishlist
-- ============================================================

CREATE TABLE carts (
    id          BIGSERIAL    PRIMARY KEY,
    user_id     BIGINT       NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_items (
    id              BIGSERIAL      PRIMARY KEY,
    cart_id         BIGINT         NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id      BIGINT         NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity        INTEGER        NOT NULL CHECK (quantity > 0),
    price_snapshot  NUMERIC(10,2)  NOT NULL,
    created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    UNIQUE (cart_id, product_id)
);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);

CREATE TABLE wishlist_items (
    id          BIGSERIAL    PRIMARY KEY,
    user_id     BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id  BIGINT       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);
CREATE INDEX idx_wishlist_user ON wishlist_items(user_id);
