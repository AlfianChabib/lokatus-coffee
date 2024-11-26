import { type NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.cookies;

  if (pathname === "/" || pathname === "/login") {
    const token = cookies.get("token");

    if (token && token.value) {
      return NextResponse.redirect(new URL("/dashboard/quotes", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    const token = cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/passkey")) {
    const quoteToken = cookies.get("quote");

    if (quoteToken && quoteToken.value) {
      return NextResponse.redirect(new URL("/quote", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/quote")) {
    const quoteToken = cookies.get("quote");
    const { device } = userAgent(req);
    const newHeader = new Headers(req.headers);

    if (device.vendor) {
      newHeader.set("vendor", device.vendor);
      return NextResponse.next({ request: { headers: newHeader } });
    }

    if (quoteToken && quoteToken.value) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/mood")) {
    const passkey = cookies.get("passkey");
    if (!passkey) return NextResponse.redirect(new URL("/passkey", req.url));

    const { device } = userAgent(req);
    const isMobile = device.type === "mobile";

    if (!isMobile) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/request")) {
    const requestId = cookies.get("requestId");
    if (requestId && requestId.value) {
      return NextResponse.redirect(new URL("/quote", req.url));
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
