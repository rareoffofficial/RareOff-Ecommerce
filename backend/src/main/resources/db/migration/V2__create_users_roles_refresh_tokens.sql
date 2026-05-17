-- ============================================================
-- V2: Auth schema — users, roles, user_roles, refresh_tokens.
-- Removes the throwaway _bootstrap table from V1.
-- ============================================================

DROP TABLE IF EXISTS _bootstrap;

-- ---------- ROLES ----------
CREATE TABLE roles (
    id         BIGSERIAL    PRIMARY KEY,
    name       VARCHAR(50)  NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- ---------- USERS ----------
CREATE TABLE users (
    id              BIGSERIAL     PRIMARY KEY,
    full_name       VARCHAR(150),
    email           VARCHAR(190)  NOT NULL UNIQUE,
    password_hash   VARCHAR(255)  NOT NULL,
    phone           VARCHAR(30),
    enabled         BOOLEAN       NOT NULL DEFAULT TRUE,
    email_verified  BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users (LOWER(email));

-- ---------- USER ↔ ROLE (many-to-many) ----------
CREATE TABLE user_roles (
    user_id  BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id  BIGINT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    PRIMARY KEY (user_id, role_id)
);

-- ---------- REFRESH TOKENS (opaque, hashed) ----------
CREATE TABLE refresh_tokens (
    id          BIGSERIAL     PRIMARY KEY,
    token_hash  VARCHAR(255)  NOT NULL UNIQUE,
    user_id     BIGINT        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at  TIMESTAMPTZ   NOT NULL,
    revoked     BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_user ON refresh_tokens (user_id);
CREATE INDEX idx_refresh_expires ON refresh_tokens (expires_at) WHERE revoked = FALSE;
