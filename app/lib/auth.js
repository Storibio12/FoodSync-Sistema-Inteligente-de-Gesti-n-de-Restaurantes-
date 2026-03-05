import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";

/**
 * Obtiene el token de admin desde las cookies (para Server Components).
 * Uso: const token = await getAdminToken(); if (!token) redirect(...)
 */
export async function getAdminToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

/**
 * Obtiene el token desde el request (para Route Handlers).
 * Uso: const token = getAdminTokenFromRequest(request);
 */
export function getAdminTokenFromRequest(request) {
  return request.cookies.get(COOKIE_NAME)?.value ?? null;
}

/**
 * Devuelve los headers para hacer fetch autenticado a la API externa.
 * Uso: fetch(API_URL + '/reservations', { headers: getAuthHeaders(token) })
 */
export function getAuthHeaders(token) {
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Base URL de la API (mismo valor que en route de login).
 */
export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
}

/**
 * Fetch a la API externa con el token de admin (para Route Handlers).
 * Si la API devuelve 401, devuelve { unauthorized: true } para que el route limpie cookie y redirija.
 */
export async function fetchWithAuth(path, options = {}, request) {
  const token = request ? getAdminTokenFromRequest(request) : null;
  const baseUrl = getApiUrl();
  const url = path.startsWith("http") ? path : `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const res = await fetch(url, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(token),
      ...options.headers,
    },
  });
  return res;
}
