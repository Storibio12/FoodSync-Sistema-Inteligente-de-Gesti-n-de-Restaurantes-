import { NextResponse } from "next/server";
import { fetchWithAuth } from "@/app/lib/auth";

/**
 * Proxy a la API externa con token de admin.
 * GET/POST/PATCH/DELETE /api/admin/reservations -> GET/POST/PATCH/DELETE {API_URL}/reservations
 * /api/admin/clients/1 -> {API_URL}/clients/1
 */
export async function GET(request, { params }) {
  return proxyRequest(request, params, "GET");
}

export async function POST(request, { params }) {
  return proxyRequest(request, params, "POST");
}

export async function PATCH(request, { params }) {
  return proxyRequest(request, params, "PATCH");
}

export async function DELETE(request, { params }) {
  return proxyRequest(request, params, "DELETE");
}

async function proxyRequest(request, { params }, method) {
  const pathSegments = params.path || [];
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

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  if (contentType.includes("application/json") && text) {
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch (_) {}
  }
  return new NextResponse(text, { status: res.status, headers: { "Content-Type": contentType } });
}
