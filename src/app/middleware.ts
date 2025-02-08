import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routeNames } from "./routes";
import { UserRoleEnum } from "./Enums";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("XSRF-TOKEN"); // Laravel maneja CSRF tokens
  const userRole = req.cookies.get("role")?.value;

  const url = req.nextUrl.clone();

  if (!token) {
    return NextResponse.redirect(new URL(routeNames.login, req.url));
  }

  if (url.pathname.startsWith(`/${UserRoleEnum.Doctor}`) && userRole !== "doctor") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.pathname.startsWith(`/${UserRoleEnum.Admin}`) && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [`/${UserRoleEnum.Doctor}/:path*`, `/${UserRoleEnum.Admin}/:path*`],
};
