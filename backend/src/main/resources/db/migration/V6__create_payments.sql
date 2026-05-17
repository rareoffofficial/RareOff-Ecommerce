-- ============================================================
-- V6: Payments (provider-agnostic, Razorpay first)
-- ============================================================

CREATE TABLE payments (
    id                    BIGSERIAL      PRIMARY KEY,
    order_id              BIGINT         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    provider              VARCHAR(32)    NOT NULL,             -- RAZORPAY/STRIPE
    provider_order_id     VARCHAR(120),
    provider_payment_id   VARCHAR(120),
    provider_signature    VARCHAR(255),
    amount                NUMERIC(12,2)  NOT NULL,
    currency              VARCHAR(8)     NOT NULL DEFAULT 'INR',
    status                VARCHAR(32)    NOT NULL,             -- CREATED/VERIFIED/FAILED
    raw_response          TEXT,
    created_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_payments_order             ON payments(order_id);
CREATE INDEX idx_payments_provider_payment  ON payments(provider_payment_id);
CREATE INDEX idx_payments_provider_order    ON payments(provider_order_id);
