import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getTokenFromCookie } from "./utils/Helper";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // const token = getTokenFromCookie()
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  } 

  // Otherwise, allow request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // run on everything except these
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
