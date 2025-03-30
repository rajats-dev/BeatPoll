import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && url.pathname == "/") {
    return NextResponse.redirect(new URL("/client", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/client"],
};
