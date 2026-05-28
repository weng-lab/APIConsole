DROP INDEX IF EXISTS "api_keys_clerk_user_id_unique";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "api_keys_clerk_user_id_idx" ON "api_keys" USING btree ("clerk_user_id");
