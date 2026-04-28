# API Console

Simple Next.js console for Clerk-authenticated users to create and view an API key stored in Neon Postgres.

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

4. Generate and apply the database migration:

```bash
pnpm db:generate
pnpm db:migrate
```

5. Start development:

```bash
pnpm dev
```

## API Keys

This first version stores API keys as plaintext so users can view them later in the console. Hashing, encryption, revocation, and rotation can be added later if the service needs stronger security.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```
