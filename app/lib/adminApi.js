/**
 * Cliente para llamar a la API del panel admin (proxy /api/admin/*).
 * En 401 redirige a /admin/login (usar desde cliente con useRouter).
 */

const BASE = "/api/admin";

export async function adminFetch(path, options = {}) {
  const url = path.startsWith("/") ? `${BASE}${path}` : `${BASE}/${path}`;
  const timeoutMs = Number(options.timeoutMs) || 15000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const res = await fetch(url, {
    ...options,
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  clearTimeout(timeoutId);
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new Error("No autorizado");
  }
  return res;
}

export async function adminGet(path) {
  const res = await adminFetch(path);
  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText);
  return text ? JSON.parse(text) : {};
}

export async function adminPost(path, body) {
  const res = await adminFetch(path, { method: "POST", body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText);
  return text ? JSON.parse(text) : {};
}

export async function adminPatch(path, body) {
  const res = await adminFetch(path, { method: "PATCH", body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText);
  return text ? JSON.parse(text) : {};
}

export async function adminDelete(path) {
  const res = await adminFetch(path, { method: "DELETE" });
  if (res.status === 204 || res.status === 200) return;
  const text = await res.text();
  throw new Error(text || res.statusText);
}
