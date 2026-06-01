import { clerkClient, auth } from "@clerk/nextjs/server";
import { callAuthService } from "@/lib/auth-service";

type ApiKeyResponse = {
  id: string;
};

export async function DELETE() {
  const { userId, getToken } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await getToken();

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await callAuthService("api-key", { token });

    if (!response.ok) {
      return Response.json(
        { error: "Could not delete API keys" },
        { status: 502 },
      );
    }

    const data: { apiKeys: ApiKeyResponse[] } = await response.json();

    for (const apiKey of data.apiKeys) {
      const deleteResponse = await callAuthService(`api-key/${apiKey.id}`, {
        method: "DELETE",
        token,
      });

      if (!deleteResponse.ok) {
        return Response.json(
          { error: "Could not delete API keys" },
          { status: 502 },
        );
      }
    }
  } catch (error) {
    console.error("Could not clean up auth-service keys", error);

    return Response.json(
      { error: "Could not reach auth service" },
      { status: 502 },
    );
  }

  const client = await clerkClient();
  await client.users.deleteUser(userId);

  return Response.json({ deleted: true });
}
