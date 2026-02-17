import { NextResponse } from "next/server";
import { getApiUrl } from "@/app/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || data.error || "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    const token = data.token ?? data.accessToken ?? data.access_token;
    if (!token) {
      return NextResponse.json(
        { error: "La API no devolvió un token" },
        { status: 502 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Error al conectar con el servidor" },
      { status: 500 }
    );
  }
}
