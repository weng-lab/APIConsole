import "server-only";

type AuthServiceRequestOptions = {
  body?: unknown;
  method?: string;
  token: string;
};

function getAuthServiceUrl(path: string) {
  const baseUrl = process.env.AUTH_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("AUTH_SERVICE_URL is not configured");
  }

  return new URL(path, `${baseUrl.replace(/\/$/, "")}/`);
}

export async function callAuthService(
  path: string,
  { body, method = "GET", token }: AuthServiceRequestOptions,
) {
  return fetch(getAuthServiceUrl(path), {
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    method,
  });
}

export async function proxyAuthServiceResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return Response.json(await response.json(), { status: response.status });
  }

  return new Response(await response.text(), { status: response.status });
}
