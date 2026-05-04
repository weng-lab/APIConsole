import { clerkClient, auth } from "@clerk/nextjs/server";
import { deleteApiKeyForUser } from "@/lib/api-keys";

export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await deleteApiKeyForUser(userId);

  const client = await clerkClient();
  await client.users.deleteUser(userId);

  return Response.json({ deleted: true });
}
