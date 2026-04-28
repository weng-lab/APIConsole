import { auth } from '@clerk/nextjs/server';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { apiKeys } from '@/db/schema';
import { generateApiKey } from '@/lib/api-keys';

async function getCurrentApiKey(userId: string) {
  const [apiKey] = await db
    .select({
      keyValue: apiKeys.keyValue,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .where(and(eq(apiKeys.clerkUserId, userId), isNull(apiKeys.revokedAt)))
    .limit(1);

  return apiKey ?? null;
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return Response.json({ apiKey: await getCurrentApiKey(userId) });
}

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existingKey = await getCurrentApiKey(userId);

  if (existingKey) {
    return Response.json({ apiKey: existingKey });
  }

  await db.insert(apiKeys).values({
    clerkUserId: userId,
    keyValue: generateApiKey(),
  });

  return Response.json({ apiKey: await getCurrentApiKey(userId) }, { status: 201 });
}
