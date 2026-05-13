CREATE TABLE "user_survey_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"heard_about" jsonb NOT NULL,
	"heard_about_paper" text,
	"heard_about_other" text,
	"use_cases" jsonb NOT NULL,
	"use_case_other" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "user_survey_responses_clerk_user_id_unique" ON "user_survey_responses" USING btree ("clerk_user_id");
