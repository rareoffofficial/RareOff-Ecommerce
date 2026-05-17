-- ============================================================
-- V3: Catalog schema — categories, products, product_images.
-- ============================================================

CREATE TABLE categories (
    id          BIGSERIAL    PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    slug        VARCHAR(180) NOT NULL UNIQUE,
    image_url   VARCHAR(500),
    parent_id   BIGINT       REFERENCES categories(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_categories_parent ON categories(parent_id);

CREATE TABLE products (
    id                BIGSERIAL      PRIMARY KEY,
    sku               VARCHAR(64)    NOT NULL UNIQUE,
    name              VARCHAR(200)   NOT NULL,
    slug              VARCHAR(220)   NOT NULL UNIQUE,
    description       TEXT,
    price             NUMERIC(10,2)  NOT NULL CHECK (price >= 0),
    compare_at_price  NUMERIC(10,2)  CHECK (compare_at_price IS NULL OR compare_at_price >= 0),
    stock             INTEGER        NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category_id       BIGINT         REFERENCES categories(id) ON DELETE SET NULL,
    brand             VARCHAR(120),
    material          VARCHAR(120),
    is_active         BOOLEAN        NOT NULL DEFAULT TRUE,
    is_featured       BOOLEAN        NOT NULL DEFAULT FALSE,
    is_trending       BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_products_category ON products(category_id) WHERE is_active = TRUE;
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_trending ON products(is_trending) WHERE is_trending = TRUE;
CREATE INDEX idx_products_name_trgm ON products(LOWER(name));

CREATE TABLE product_images (
    id          BIGSERIAL    PRIMARY KEY,
    product_id  BIGINT       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url         VARCHAR(500) NOT NULL,
    position    INTEGER      NOT NULL DEFAULT 0,
    is_primary  BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_product_images_product ON product_images(product_id);
