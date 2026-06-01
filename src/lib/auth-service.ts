import "server-only";

type AuthServiceRequestOptions = {
  body?: unknown;
  method?: string;
  token: string;
};

function parseJson(text: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

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
  const text = await response.text();

  if (!response.ok) {
    console.error("auth-service returned an error", {
      body: text.slice(0, 1000),
      status: response.status,
      statusText: response.statusText,
    });
  }

  if (contentType?.includes("application/json")) {
    return Response.json(parseJson(text) ?? { error: text }, {
      status: response.status,
    });
  }

  return new Response(text, { status: response.status });
}
