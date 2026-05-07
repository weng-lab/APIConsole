# API Console

API Console is a Next.js app for Clerk-authenticated users to create and manage one API key stored in Neon Postgres. It also hosts authenticated Markdown documentation for the SCREEN GraphQL API.

Generated API keys are currently managed by this console only. No route in this app uses them to authorize external API traffic; `validateApiKey()` exists for future use but is not wired into the app.

## What It Does

- Provides Clerk sign-in and sign-up at `/`.
- Redirects signed-in users to `/dashboard`.
- Lets each user create, reveal, copy, rename, and delete one API key.
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
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
```

Create a Clerk app for the publishable and secret keys, provision a Neon Postgres database for `DATABASE_URL`, and keep those values in `.env.local`. Drizzle commands read `.env.local` directly.

4. Apply database migrations:

```bash
pnpm db:migrate
```

5. Start development:

```bash
pnpm dev
```

## API Keys

Each Clerk user can have one API key. Active keys are reused when `POST /api/api-key` is called; expired keys are deleted and replaced.

Keys expire 90 days after `created_at`, but the expiration date is computed in application code and is not stored in the database. Keys are currently stored as plaintext so users can reveal them later in the console. Hashing, encryption, revocation, and rotation history are not implemented yet.

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
