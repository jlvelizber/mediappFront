declare global {
  interface Window {
    __MEDIAPP_ENV__?: {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_PUBLIC_URL: string;
    };
  }
}

/** URL base de la API (incluye `/api` si aplica). Preferencia: runtime inyectado en `_document`. */
export function getPublicApiUrl(): string {
  if (typeof window !== "undefined" && window.__MEDIAPP_ENV__?.NEXT_PUBLIC_API_URL) {
    return window.__MEDIAPP_ENV__.NEXT_PUBLIC_API_URL;
  }
  return (
    (typeof process !== "undefined" && process.env.MEDIAPP_PUBLIC_API_URL) ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  );
}

/** URL publica del sitio (frontend). */
export function getPublicSiteUrl(): string {
  if (typeof window !== "undefined" && window.__MEDIAPP_ENV__?.NEXT_PUBLIC_PUBLIC_URL) {
    return window.__MEDIAPP_ENV__.NEXT_PUBLIC_PUBLIC_URL;
  }
  return (
    (typeof process !== "undefined" && process.env.MEDIAPP_PUBLIC_SITE_URL) ||
    process.env.NEXT_PUBLIC_PUBLIC_URL ||
    ""
  );
}
