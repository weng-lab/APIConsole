import { auth } from "@clerk/nextjs/server";
import { callAuthService, proxyAuthServiceResponse } from "@/lib/auth-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getClerkToken() {
  const { userId, getToken } = await auth();

  if (!userId) {
    return null;
  }

  return getToken();
}

export async function PATCH(request: Request, context: RouteContext) {
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
    const { id } = await context.params;
    const response = await callAuthService(`api-key/${id}`, {
      body,
      method: "PATCH",
      token,
    });

    return proxyAuthServiceResponse(response);
  } catch (error) {
    console.error(
      "Could not proxy PATCH /api/api-key/:id to auth-service",
      error,
    );

    return Response.json(
      { error: "Could not reach auth service" },
      { status: 502 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const token = await getClerkToken();

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const response = await callAuthService(`api-key/${id}`, {
      method: "DELETE",
      token,
    });

    return proxyAuthServiceResponse(response);
  } catch (error) {
    console.error(
      "Could not proxy DELETE /api/api-key/:id to auth-service",
      error,
    );

    return Response.json(
      { error: "Could not reach auth service" },
      { status: 502 },
    );
  }
}
