import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routeNames } from "./app/routes";
import { UserRoleEnum } from "./app/Enums";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role");
  const url = req.nextUrl.clone();

  // Excluir la ruta de inicio de sesión del middleware
  if (url.pathname.startsWith(`${routeNames.login}`) && !role) {
    return NextResponse.next();
  }
  
  // Redirigir a /auth/login si no hay token
  if (!role) {
    return NextResponse.redirect(new URL(`${routeNames.login}`, req.url));
  }


  // Redirigir según el rol del usuario
  const { value } = role;
  const basePath = `/${value}`;
  if (!url.pathname.startsWith(basePath)) {
    return NextResponse.redirect(new URL(basePath, req.url));
  }

  console.log(UserRoleEnum.Admin)
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/doctor/:path*', '/admin/:path*'],
};