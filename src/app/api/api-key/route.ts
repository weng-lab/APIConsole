import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { generateApiKey } from "@/lib/api-keys";

async function getCurrentApiKey(userId: string) {
  const [apiKey] = await db
    .select({
      keyValue: apiKeys.keyValue,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.clerkUserId, userId))
    .limit(1);

  return apiKey ?? null;
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ apiKey: await getCurrentApiKey(userId) });
}

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [createdKey] = await db
      .insert(apiKeys)
      .values({
        clerkUserId: userId,
        keyValue: generateApiKey(),
      })
      .returning({
        keyValue: apiKeys.keyValue,
        createdAt: apiKeys.createdAt,
      });

    return Response.json({ apiKey: createdKey }, { status: 201 });
  } catch {
    const existingKey = await getCurrentApiKey(userId);

    if (existingKey) {
      return Response.json({ apiKey: existingKey });
    }

    return Response.json(
      { error: "Could not create API key" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.delete(apiKeys).where(eq(apiKeys.clerkUserId, userId));

  return Response.json({ deleted: true });
}
