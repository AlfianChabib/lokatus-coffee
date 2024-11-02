import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  if (pathname.startsWith("/quote")) {
    console.log(searchParams.get("query"));
    return NextResponse.next();
  }
  // const { device } = userAgent(req);

  return NextResponse.next();
}
