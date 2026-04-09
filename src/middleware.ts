import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routeNames } from "./app/routes";

export async function middleware(req: NextRequest) {
  // Peticiones internas de Next (RSC / `/_next/data` para client navigation).
  // Si el middleware redirige aquí, el cliente recibe 307/HTML en lugar de JSON y la transición falla.
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const role = req.cookies.get("role");
  const url = req.nextUrl.clone();
  const isLoginPath = url.pathname.startsWith(routeNames.login);
  const isSetupPath = url.pathname.startsWith(routeNames.setup);
  const isDoctorPath = url.pathname.startsWith(routeNames.doctors);

  // Allow unauthenticated users to reach login/setup.
  if ((isLoginPath || isSetupPath) && !role) {
    return NextResponse.next();
  }

  if (isSetupPath && role) {
    return NextResponse.redirect(new URL(routeNames.doctors, req.url));
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
  matcher: ["/", "/doctor/:path*", "/auth/login", "/setup"],
};