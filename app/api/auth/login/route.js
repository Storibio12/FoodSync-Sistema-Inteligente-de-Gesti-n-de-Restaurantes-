import { NextResponse } from "next/server";
import { getApiUrl } from "@/app/lib/auth";

export async function POST(request) {
  const apiUrl = getApiUrl();
  const loginUrl = `${apiUrl.replace(/\/$/, "")}/auth/login`;

  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    let res;
    try {
      res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch (fetchErr) {
      return NextResponse.json(
        {
          error: `No se pudo conectar con la API en ${loginUrl}. Comprueba que la API esté corriendo (puerto 4000) y que .env.local tenga NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1. Reinicia el servidor Next.js (npm run dev) después de cambiar .env.local.`,
        },
        { status: 502 }
      );
    }

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : {};

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
      {
        error: `Error al conectar con el servidor. URL usada: ${loginUrl}. Si tu API está en el puerto 4000, crea .env.local con NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1 y reinicia Next.js.`,
      },
      { status: 500 }
    );
  }
}
