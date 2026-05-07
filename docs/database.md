# Database And Migrations

This project uses Neon Postgres for API-key storage and Drizzle for schema and migrations.

## API Key Table

The `api_keys` table contains:

- `id` - UUID primary key.
- `clerk_user_id` - Clerk user ID, unique per row.
- `name` - display name, defaulting to `Default`, max 120 characters.
- `key_value` - plaintext API key value, globally unique.
- `created_at` - timestamp used to compute expiration.

The unique index on `clerk_user_id` is important: the application expects one API key per Clerk user.

## Drizzle

Drizzle reads the schema from `src/db/schema.ts` and writes migrations under `drizzle/`.

`drizzle.config.ts` loads `.env.local` directly. Database commands require `DATABASE_URL` to be present there.

## Migration Gotcha

`drizzle/0001_simplify_api_keys.sql` removes duplicate API-key rows per Clerk user before adding the unique index. It keeps the first row per `clerk_user_id`, preferring non-revoked rows, then the oldest `created_at`, then the lowest `id`.

Back up production data before applying this migration to a database with historical keys.
