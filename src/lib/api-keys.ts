import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";

const API_KEY_EXPIRATION_DAYS = 90;
const API_KEY_EXPIRATION_MS = API_KEY_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export type ApiKeyRecord = {
  id: string;
  clerkUserId: string;
  name: string;
  keyValue: string;
  createdAt: Date;
  expiresAt: Date;
};

export type ValidateApiKeyResult =
  | { valid: true; apiKey: ApiKeyRecord }
  | { valid: false; reason: "not_found" }
  | { valid: false; reason: "expired"; apiKey: ApiKeyRecord };

function withExpiration(apiKey: Omit<ApiKeyRecord, "expiresAt">): ApiKeyRecord {
  return {
    ...apiKey,
    expiresAt: new Date(apiKey.createdAt.getTime() + API_KEY_EXPIRATION_MS),
  };
}

export function generateApiKey() {
  return `ac_test_${randomBytes(24).toString("base64url")}`;
}

export async function getApiKeyForUser(clerkUserId: string) {
  const [apiKey] = await db
    .select({
      id: apiKeys.id,
      clerkUserId: apiKeys.clerkUserId,
      name: apiKeys.name,
      keyValue: apiKeys.keyValue,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.clerkUserId, clerkUserId))
    .limit(1);

  return apiKey ? withExpiration(apiKey) : null;
}

export async function createApiKeyForUser(clerkUserId: string) {
  const [createdKey] = await db
    .insert(apiKeys)
    .values({
      clerkUserId,
      keyValue: generateApiKey(),
    })
    .returning({
      id: apiKeys.id,
      clerkUserId: apiKeys.clerkUserId,
      name: apiKeys.name,
      keyValue: apiKeys.keyValue,
      createdAt: apiKeys.createdAt,
    });

  return withExpiration(createdKey);
}

export async function deleteApiKeyForUser(clerkUserId: string) {
  await db.delete(apiKeys).where(eq(apiKeys.clerkUserId, clerkUserId));
}

export async function renameApiKeyForUser(clerkUserId: string, name: string) {
  const [apiKey] = await db
    .update(apiKeys)
    .set({ name: name.trim() })
    .where(eq(apiKeys.clerkUserId, clerkUserId))
    .returning({
      id: apiKeys.id,
      clerkUserId: apiKeys.clerkUserId,
      name: apiKeys.name,
      keyValue: apiKeys.keyValue,
      createdAt: apiKeys.createdAt,
    });

  return apiKey ? withExpiration(apiKey) : null;
}

export async function validateApiKey(
  keyValue: string,
): Promise<ValidateApiKeyResult> {
  const [apiKey] = await db
    .select({
      id: apiKeys.id,
      clerkUserId: apiKeys.clerkUserId,
      name: apiKeys.name,
      keyValue: apiKeys.keyValue,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.keyValue, keyValue))
    .limit(1);

  if (!apiKey) {
    return { valid: false, reason: "not_found" };
  }

  const apiKeyWithExpiration = withExpiration(apiKey);

  if (Date.now() >= apiKeyWithExpiration.expiresAt.getTime()) {
    return { valid: false, reason: "expired", apiKey: apiKeyWithExpiration };
  }

  return { valid: true, apiKey: apiKeyWithExpiration };
}
