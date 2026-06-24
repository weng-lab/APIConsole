# Authentication And Routes

Clerk owns sign-in state. The app still checks auth in API handlers instead of relying only on middleware.

## Protected Pages

`src/proxy.ts` protects these routes:

- `/dashboard`

Unauthenticated users are redirected to `/login`.

Documentation routes under `/docs` are public, including docs images under `/docs/img/[filename]`.

## Sign-In Flow

The `/` route renders Clerk's sign-in/sign-up UI. Signed-in users are redirected to `/dashboard`.

The sign-in component uses hash routing, so Clerk auth subroutes stay on `/` instead of becoming Next.js pages.

## API Routes

API routes call `auth()` inside each handler and return `401` if there is no Clerk user.

This is intentional. Middleware matching decides which requests Clerk sees, but route handlers still own their authorization checks.

## Account Deletion

`DELETE /api/account` deletes the user's API key first, then deletes the Clerk user.

That is not transactional across Postgres and Clerk. If Clerk deletion fails after the database delete succeeds, the user can remain in Clerk with no API key.
