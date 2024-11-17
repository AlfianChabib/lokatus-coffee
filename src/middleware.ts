import { NextRequest, NextResponse, userAgent } from "next/server";
import { getSession } from "./utils/getSession";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/" || pathname === "/login") {
    const session = await getSession();
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    const session = await getSession();
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/mood")) {
    const { device } = userAgent(req);
    const isMobile = device.type === "mobile";

    if (!isMobile) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
