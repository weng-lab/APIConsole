# API Console

API Console is a Next.js app for Clerk-authenticated users to create and manage API keys through `auth-service`. It also hosts authenticated Markdown documentation for the SCREEN GraphQL API.

Generated API keys are owned by `auth-service`. This app proxies key management requests to `AUTH_SERVICE_URL` with the user's Clerk session token.

## What It Does

- Provides Clerk sign-in and sign-up at `/`.
- Redirects signed-in users to `/dashboard`.
- Lets each user create, reveal, copy, rename, and delete up to 5 API keys.
- Serves protected docs under `/docs`.

## Stack

- Next.js App Router
- Clerk authentication
- Neon Postgres
- Drizzle ORM and migrations
- MUI components
- Markdown docs rendered with `react-markdown`

## Setup

1. Install dependencies:

```bash
corepack enable
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
AUTH_SERVICE_URL="http://localhost:3001"
```

Create a Clerk app for the publishable and secret keys, run `auth-service`, and set `AUTH_SERVICE_URL` to its base URL. For local development, run APIConsole on `http://localhost:3000`, run `auth-service` on `http://localhost:3001`, and set the auth-service `CLERK_AUTHORIZED_PARTIES` to include `http://localhost:3000`. Keep those values in `.env.local`. Drizzle commands still read `.env.local` directly for the remaining local database-backed features.

4. Apply database migrations:

```bash
pnpm db:migrate
```

5. Start development:

```bash
pnpm dev
```

## API Keys

Each Clerk user can have up to 5 API keys. The console calls `auth-service` for listing, creation, rename, and deletion.

Keys expire 90 days after creation. Keys are currently stored as plaintext by `auth-service` so users can reveal them later in the console. Hashing, encryption, revocation, and rotation history are not implemented yet.

## Maintainer Notes

- [Authentication and routes](docs/auth.md)
- [API-key lifecycle](docs/api-keys.md)
- [Database and migrations](docs/database.md)
- [Docs system](docs/docs-system.md)

## Scripts

- `pnpm dev` - start the development server.
- `pnpm build` - build the production app.
- `pnpm start` - start the production server after building.
- `pnpm lint` - run ESLint.
- `pnpm check` - check formatting with Prettier.
- `pnpm format` - format files with Prettier.
- `pnpm db:generate` - generate Drizzle migrations from `src/db/schema.ts`.
- `pnpm db:migrate` - apply Drizzle migrations using `.env.local`.
- `pnpm db:studio` - open Drizzle Studio.
