# Database And Migrations

This project uses Drizzle for the remaining local database-backed features. API-key storage has moved to `auth-service`.

## API Key Table

Historical migrations in this repository include an `api_keys` table:

- `id` - UUID primary key.
- `clerk_user_id` - Clerk user ID, unique per row.
- `name` - display name, defaulting to `Default`, max 120 characters.
- `key_value` - plaintext API key value, globally unique.
- `created_at` - timestamp used to compute expiration.

The console no longer reads or writes this table for API-key CRUD. `auth-service` owns key storage and supports up to 5 keys per Clerk user.

`drizzle/0003_fresh_speed_demon.sql` removes the old one-key-per-user index if APIConsole migrations are still applied to an existing shared database.

## Drizzle

Drizzle reads the schema from `src/db/schema.ts` and writes migrations under `drizzle/`.

`drizzle.config.ts` loads `.env.local` directly. Database commands require `DATABASE_URL` to be present there.

## Migration Gotcha

`drizzle/0001_simplify_api_keys.sql` removes duplicate API-key rows per Clerk user before adding the unique index. It keeps the first row per `clerk_user_id`, preferring non-revoked rows, then the oldest `created_at`, then the lowest `id`.

Back up production data before applying this migration to a database with historical keys.
