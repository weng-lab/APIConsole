import { auth } from "@clerk/nextjs/server";
import { callAuthService, proxyAuthServiceResponse } from "@/lib/auth-service";

async function getClerkToken() {
  const { userId, getToken } = await auth();

  if (!userId) {
    return null;
  }

  return getToken();
}

export async function GET() {
  const token = await getClerkToken();

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await callAuthService("api-key", { token });

    return proxyAuthServiceResponse(response);
  } catch {
    return Response.json(
      { error: "Could not reach auth service" },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  const token = await getClerkToken();

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = undefined;
  }

  try {
    const response = await callAuthService("api-key", {
      body,
      method: "POST",
      token,
    });

    return proxyAuthServiceResponse(response);
  } catch {
    return Response.json(
      { error: "Could not reach auth service" },
      { status: 502 },
    );
  }
}
