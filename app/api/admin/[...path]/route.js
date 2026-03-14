import { NextResponse } from "next/server";
import { fetchWithAuth } from "@/app/lib/auth";

/**
 * Proxy a la API externa con token de admin.
 * GET/POST/PATCH/DELETE /api/admin/reservations -> GET/POST/PATCH/DELETE {API_URL}/reservations
 * /api/admin/clients/1 -> {API_URL}/clients/1
 */
export async function GET(request, context) {
  return proxyRequest(request, context, "GET");
}

export async function POST(request, context) {
  return proxyRequest(request, context, "POST");
}

export async function PATCH(request, context) {
  return proxyRequest(request, context, "PATCH");
}

export async function DELETE(request, context) {
  return proxyRequest(request, context, "DELETE");
}

async function proxyRequest(request, context, method) {
  const rawParams = context?.params;
  const params = rawParams != null && typeof rawParams.then === "function" ? await rawParams : rawParams ?? {};
  const pathSegments = Array.isArray(params.path) ? params.path : [];
  const path = pathSegments.join("/");
  if (!path) {
    return NextResponse.json({ error: "Path required" }, { status: 400 });
  }

  let body;
  if ((method === "POST" || method === "PATCH") && request.body) {
    body = await request.text();
  }
  const res = await fetchWithAuth(path, {
    method,
    ...(body !== undefined && { body }),
  }, request);

  if (res.status === 401) {
    const response = NextResponse.json({ error: "No autorizado" }, { status: 401 });
    response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
    return response;
  }

  // 204 / 205 no llevan body — devolverlos directamente evita el error 500
  if (res.status === 204 || res.status === 205) {
    return new NextResponse(null, { status: res.status });
  }

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  if (contentType.includes("application/json") && text) {
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch (_) { }
  }
  // Si el body está vacío, devolver solo el status sin intentar poner body
  if (!text) {
    return new NextResponse(null, { status: res.status });
  }
  return new NextResponse(text, { status: res.status, headers: { "Content-Type": contentType } });
}
