import { getToken } from "next-auth/jwt";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";



export const config = { matcher: ["/dashboard/:path*", '/'] };


export default async function middleware(req: NextRequest, event: NextFetchEvent) {
	const token = await getToken({ req });
	const isAuthenticated = !!token;

	if ((req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/register') && isAuthenticated) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	const authMiddleware = withAuth({
		pages: {
			signIn: `/`,
		},
	});

	return authMiddleware(req as NextRequestWithAuth, event);
}