import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return redirectToLogin(request, isAdminApi);
  }

  const session = await verifySessionToken(token);

  if (!session || session.role !== "admin") {
    return redirectToLogin(request, isAdminApi);
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest, isApi: boolean) {
  if (isApi) {
    return NextResponse.json(
      { error: "Não autorizado" },
      { status: 401 }
    );
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
