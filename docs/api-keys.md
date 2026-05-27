# API-Key Lifecycle

The console manages one API key per Clerk user through the API Gateway auth API.

API-key storage and lifecycle operations are centralized in `api-gateways`. The browser calls `NEXT_PUBLIC_API_GATEWAY_URL/api/api-key` directly with a Clerk bearer token, so APIConsole does not need database access for API-key management.

## Creation

`POST /api/api-key` on the API Gateway is idempotent while the current key is active. If a user already has an active key, the route returns that key instead of creating another.

If the existing key is expired, the route deletes it and creates a replacement.

## Expiration

Keys expire 90 days after `created_at`.

There is no `expires_at` database column. Expiration is computed by the API Gateway auth API, so expired keys can still exist in the database until the user replaces or deletes them.

## Storage

Keys are stored as plaintext in `api_keys.key_value`. This lets the console reveal and copy the key after creation.

The masked key in the table is only a UI presentation detail. It is not encryption.

## Naming And Deletion

`PATCH /api/api-key` on the API Gateway renames the current user's key. Names are trimmed, required, and limited to 120 characters.

`DELETE /api/api-key` on the API Gateway hard-deletes the current user's key. There is no revocation or rotation history.
