import { clerkClient, auth } from "@clerk/nextjs/server";

const apiGatewayUrl = (
  process.env.API_GATEWAY_URL ?? process.env.NEXT_PUBLIC_API_GATEWAY_URL
)?.replace(/\/$/, "");

export async function DELETE() {
  const { userId, getToken } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!apiGatewayUrl) {
    return Response.json(
      { error: "API gateway URL is not configured" },
      { status: 503 },
    );
  }

  const token = await getToken();

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKeyResponse = await fetch(`${apiGatewayUrl}/api/api-key`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!apiKeyResponse.ok) {
    return Response.json(
      { error: "Could not delete API key" },
      { status: 502 },
    );
  }

  const client = await clerkClient();
  await client.users.deleteUser(userId);

  return Response.json({ deleted: true });
}
