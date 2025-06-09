import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedData {
    userId: number;
    name: string;
    role: string;
}

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;

    const token = req.cookies.get("token")?.value;

    let decoded: DecodedData | null = null;

    if (token) {
        try {
            decoded = jwtDecode<DecodedData>(token);
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    const isAdminRoute = url.startsWith("/admin") && url != "/admin";
    const isLoggedUserRoute =
        url.startsWith("/restaurants") &&
        url !== "/restaurants" &&
        !/^\/restaurants\/[^/]+$/.test(url) &&   !url.startsWith("/restaurants/search")
    const isAuthRoute = url.startsWith("/auth") || url === "/admin";

    const isCustomer = decoded?.role === "customer";
    const isAdmin = decoded?.role === "admin";

    if (isAdminRoute) {
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if(token && isAdmin && isAuthRoute){
        return NextResponse.redirect(new URL("/admin/users", req.url));
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if(token && isAdmin && !isAdminRoute){
        return NextResponse.redirect(new URL("/admin/users", req.url));
    }

    if (!token && (isLoggedUserRoute || isAdminRoute)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
