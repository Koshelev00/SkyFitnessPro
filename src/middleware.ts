import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token_global")?.value;
  const url = req.nextUrl.clone();

  const publicPaths = ["/", "/course/:id"];


  const isPrivate = !publicPaths.some((path) =>
    req.nextUrl.pathname.match(new RegExp(`^${path.replace(":", "[^/]+")}$`))
  );

  if (isPrivate && !token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/profile",
    "/courseWorkout/:courseId*",
    
  ],
};