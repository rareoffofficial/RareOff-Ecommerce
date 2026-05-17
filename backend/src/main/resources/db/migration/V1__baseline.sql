-- ============================================================
-- V1: Baseline migration.
-- Real schema (users, products, orders…) lands in V2+ as each
-- module is implemented (Phase 1 starts with users + roles).
--
-- Naming convention:  V{version}__{snake_case_description}.sql
-- ============================================================

-- Enable UUID generation (useful for non-sequential public IDs later)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sanity table so Flyway has something to migrate on first boot.
-- Will be dropped in V2 when real schema arrives.
CREATE TABLE IF NOT EXISTS _bootstrap (
    id          SERIAL PRIMARY KEY,
    note        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO _bootstrap (note) VALUES ('RAREOFF backend baseline migration applied');
