import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const connectionUrl = new URL(databaseUrl);
connectionUrl.searchParams.delete("sslmode");

const pool = new pg.Pool({
  connectionString: connectionUrl.toString(),
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
