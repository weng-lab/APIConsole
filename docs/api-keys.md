# API-Key Lifecycle

The console manages one API key per Clerk user.

Generated API keys are currently managed by this console only. No route in this app uses them to authorize external API traffic; `validateApiKey()` exists for future use but is not wired into the app.

## Creation

`POST /api/api-key` is idempotent while the current key is active. If a user already has an active key, the route returns that key instead of creating another.

If the existing key is expired, the route deletes it and creates a replacement.

## Expiration

Keys expire 90 days after `created_at`.

There is no `expires_at` database column. Expiration is computed in `src/lib/api-keys.ts`, so expired keys can still exist in the database until the user replaces or deletes them.

## Storage

Keys are stored as plaintext in `api_keys.key_value`. This lets the console reveal and copy the key after creation.

The masked key in the table is only a UI presentation detail. It is not encryption.

## Naming And Deletion

`PATCH /api/api-key` renames the current user's key. Names are trimmed, required, and limited to 120 characters.

`DELETE /api/api-key` hard-deletes the current user's key. There is no revocation or rotation history.

## Validation Helper

`validateApiKey()` returns whether a key exists and whether it is expired. It is available for future API-key authentication work.
