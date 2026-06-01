import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    name: varchar("name", { length: 120 }).default("Default").notNull(),
    keyValue: text("key_value").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("api_keys_clerk_user_id_idx").on(table.clerkUserId)],
);

export const userSurveyResponses = pgTable(
  "user_survey_responses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    heardAbout: jsonb("heard_about").$type<string[]>().notNull(),
    heardAboutPaper: text("heard_about_paper"),
    heardAboutOther: text("heard_about_other"),
    useCases: jsonb("use_cases").$type<string[]>().notNull(),
    useCaseOther: text("use_case_other"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("user_survey_responses_clerk_user_id_unique").on(
      table.clerkUserId,
    ),
  ],
);
