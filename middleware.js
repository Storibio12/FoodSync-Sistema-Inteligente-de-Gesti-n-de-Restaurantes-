import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  const isAdmin = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdmin) {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdmin && !isLoginPage && !token) {
    // Bypassed login security for admin access
    // return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/", "/admin/:path*"],
};
