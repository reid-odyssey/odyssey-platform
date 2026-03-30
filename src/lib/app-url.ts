type HeaderLike = {
  get(name: string): string | null;
};

function withProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const isLocal = value.startsWith("localhost") || value.startsWith("127.0.0.1");
  return `${isLocal ? "http" : "https"}://${value}`;
}

function normalizeUrl(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(withProtocol(trimmed));
    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function getConfiguredAppUrl() {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_APP_URL) ||
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normalizeUrl(process.env.SITE_URL) ||
    normalizeUrl(process.env.CF_PAGES_URL) ||
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normalizeUrl(process.env.VERCEL_URL)
  );
}

export function getAppUrlFromHeaders(headers: HeaderLike) {
  const configured = getConfiguredAppUrl();
  if (configured) {
    return configured;
  }

  const origin = normalizeUrl(headers.get("origin"));
  if (origin) {
    return origin;
  }

  const forwardedHost = headers.get("x-forwarded-host");
  const host = forwardedHost || headers.get("host");
  if (host) {
    const proto = headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const hostOrigin = normalizeUrl(`${proto}://${host}`);
    if (hostOrigin) {
      return hostOrigin;
    }
  }

  return "http://localhost:3000";
}

export function getAppUrlFromRequest(request: Request) {
  const configured = getConfiguredAppUrl();
  if (configured) {
    return configured;
  }

  return getAppUrlFromHeaders(request.headers);
}
