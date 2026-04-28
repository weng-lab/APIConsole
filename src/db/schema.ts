import { index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const apiKeys = pgTable(
  'api_keys',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: text('clerk_user_id').notNull(),
    name: varchar('name', { length: 120 }).default('Default').notNull(),
    keyValue: text('key_value').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
  },
  (table) => [index('api_keys_clerk_user_id_idx').on(table.clerkUserId)],
);
