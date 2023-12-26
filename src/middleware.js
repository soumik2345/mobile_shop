import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });


  const privetPath = path === "/profile";
  const registrationPath = path === "/singin" || path === "/singup";
  const adminPath = path === "/admin" || path === "/admin/add_product" || path === "/admin/add_category" || path === "/admin/products";

  if (adminPath) {
    if (token) {
      if (token.isAdmin !== true) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
      NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    NextResponse.redirect(new URL("/singin", req.nextUrl));
  }

  if (adminPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (privetPath && !token) {
    return NextResponse.redirect(new URL("/singin", req.nextUrl));
  }

  if (registrationPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/singin", "/singup", "/admin", "/admin/:path*"],
};
