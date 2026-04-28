import { clerkClient, auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { apiKeys } from '@/db/schema';

export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await db.delete(apiKeys).where(eq(apiKeys.clerkUserId, userId));

  const client = await clerkClient();
  await client.users.deleteUser(userId);

  return Response.json({ deleted: true });
}
