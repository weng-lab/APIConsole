import { auth } from "@clerk/nextjs/server";
import {
  createApiKeyForUser,
  deleteApiKeyForUser,
  getApiKeyForUser,
} from "@/lib/api-keys";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ apiKey: await getApiKeyForUser(userId) });
}

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingKey = await getApiKeyForUser(userId);

  if (existingKey) {
    if (Date.now() < existingKey.expiresAt.getTime()) {
      return Response.json({ apiKey: existingKey });
    }

    await deleteApiKeyForUser(userId);
  }

  try {
    return Response.json(
      { apiKey: await createApiKeyForUser(userId) },
      { status: 201 },
    );
  } catch {
    const currentKey = await getApiKeyForUser(userId);

    if (currentKey) {
      return Response.json({ apiKey: currentKey });
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

  await deleteApiKeyForUser(userId);

  return Response.json({ deleted: true });
}
