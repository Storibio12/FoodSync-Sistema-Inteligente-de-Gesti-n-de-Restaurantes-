import { NextResponse } from "next/server";
import { getAdminTokenFromRequest } from "@/app/lib/auth";

/**
 * GET /api/auth/me
 * Comprueba si hay sesión (cookie admin_token).
 * Útil para el cliente para saber si está logueado sin validar contra la API.
 */
export async function GET(request) {
  const token = getAdminTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
