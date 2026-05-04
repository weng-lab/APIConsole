import { auth } from "@clerk/nextjs/server";
import {
  createApiKeyForUser,
  deleteApiKeyForUser,
  getApiKeyForUser,
  renameApiKeyForUser,
} from "@/lib/api-keys";

const MAX_API_KEY_NAME_LENGTH = 120;

async function getApiKeyName(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || !("name" in body)) {
      return null;
    }

    const { name } = body as { name: unknown };

    return typeof name === "string" ? name.trim() : null;
  } catch {
    return null;
  }
}

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

export async function PATCH(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const name = await getApiKeyName(request);

  if (!name || name.length > MAX_API_KEY_NAME_LENGTH) {
    return Response.json({ error: "Invalid API key name" }, { status: 400 });
  }

  try {
    const apiKey = await renameApiKeyForUser(userId, name);

    if (!apiKey) {
      return Response.json({ error: "API key not found" }, { status: 404 });
    }

    return Response.json({ apiKey });
  } catch {
    return Response.json(
      { error: "Could not rename API key" },
      { status: 500 },
    );
  }
}
