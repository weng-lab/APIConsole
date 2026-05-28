# API-Key Lifecycle

The console manages API keys through `auth-service`.

Generated API keys are owned by `auth-service`. APIConsole proxies requests to `AUTH_SERVICE_URL` with the authenticated user's Clerk session token.

## Creation

`POST /api/api-key` creates a new key through `auth-service`.

Each user can have up to 5 keys. The service returns `409` when the limit is reached.

## Expiration

Keys expire 90 days after creation. The console trusts the `expiresAt` value returned by `auth-service`.

## Storage

Keys are stored as plaintext by `auth-service`. This lets the console reveal and copy the key after creation.

The masked key in the table is only a UI presentation detail. It is not encryption.

## Naming And Deletion

`PATCH /api/api-key/:id` renames one of the current user's keys. Names are trimmed, required, and limited to 120 characters.

`DELETE /api/api-key/:id` hard-deletes one of the current user's keys. There is no revocation or rotation history.

## Validation Helper

Validation lives in `auth-service` at `POST /api-key/validate` and requires the service token. The console UI does not call it directly.
