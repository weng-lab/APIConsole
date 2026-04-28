DELETE FROM "api_keys"
WHERE "id" IN (
	SELECT "id"
	FROM (
		SELECT
			"id",
			row_number() OVER (
				PARTITION BY "clerk_user_id"
				ORDER BY ("revoked_at" IS NULL) DESC, "created_at" ASC, "id" ASC
			) AS "row_number"
		FROM "api_keys"
	) "ranked_api_keys"
	WHERE "row_number" > 1
);
--> statement-breakpoint
ALTER TABLE "api_keys" DROP COLUMN "revoked_at";
--> statement-breakpoint
DROP INDEX "api_keys_clerk_user_id_idx";
--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_clerk_user_id_unique" ON "api_keys" USING btree ("clerk_user_id");
