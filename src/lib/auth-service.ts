import "server-only";

type AuthServiceRequestOptions = {
  body?: unknown;
  method?: string;
  token: string;
};

const AUTH_SERVICE_TIMEOUT_MS = 15_000;

type JwtClaims = {
  azp?: unknown;
  exp?: unknown;
  iss?: unknown;
  sid?: unknown;
  sub?: unknown;
};

function parseJson(text: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function decodeJwtClaims(token: string): JwtClaims | null {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as JwtClaims;
  } catch {
    return null;
  }
}

function getAuthServiceUrl(path: string) {
  const baseUrl = process.env.AUTH_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("AUTH_SERVICE_URL is not configured");
  }

  const authServiceUrl = new URL(baseUrl);
  const currentVercelHost = process.env.VERCEL_URL;

  if (authServiceUrl.search || authServiceUrl.hash) {
    throw new Error(
      "AUTH_SERVICE_URL must be the auth-service origin without query params or hash fragments",
    );
  }

  if (currentVercelHost && authServiceUrl.host === currentVercelHost) {
    throw new Error("AUTH_SERVICE_URL must not point to this APIConsole app");
  }

  return new URL(path, `${authServiceUrl.origin}/`);
}

export async function callAuthService(
  path: string,
  { body, method = "GET", token }: AuthServiceRequestOptions,
) {
  const url = getAuthServiceUrl(path);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AUTH_SERVICE_TIMEOUT_MS);

  console.info("calling auth-service", {
    clerkTokenClaims: decodeJwtClaims(token),
    method,
    path: url.pathname,
    tokenLength: token.length,
    upstreamHost: url.host,
  });

  try {
    return await fetch(url, {
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      method,
      signal: controller.signal,
    });
  } catch (error) {
    if (controller.signal.aborted) {
      console.error("auth-service request timed out", {
        method,
        path: url.pathname,
        timeoutMs: AUTH_SERVICE_TIMEOUT_MS,
        upstreamHost: url.host,
      });
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
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
