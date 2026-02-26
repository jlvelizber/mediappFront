import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routeNames } from "./app/routes";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role");
  const url = req.nextUrl.clone();
  const isLoginPath = url.pathname.startsWith(routeNames.login);
  const isDoctorPath = url.pathname.startsWith(routeNames.doctors);

  // Allow unauthenticated users to reach the login page.
  if (isLoginPath && !role) {
    return NextResponse.next();
  }

  // Any protected route without role goes to login.
  if (!role) {
    return NextResponse.redirect(new URL(routeNames.login, req.url));
  }

  // This app is doctor-only: authenticated users always live under /doctor.
  if (isLoginPath || url.pathname === "/" || !isDoctorPath) {
    return NextResponse.redirect(new URL(routeNames.doctors, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/doctor/:path*", "/auth/login"],
};