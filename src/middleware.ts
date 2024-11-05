import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (pathname.startsWith("/quote")) {
    console.log(searchParams.get("query"));
    return NextResponse.next();
  }
  // const { device } = userAgent(req);

  return NextResponse.next();
}
