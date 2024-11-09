import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/getSession";

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

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

  if (pathname.startsWith("/quote")) {
    console.log(searchParams.get("query"));
    return NextResponse.next();
  }
  // const { device } = userAgent(req);

  return NextResponse.next();
}
