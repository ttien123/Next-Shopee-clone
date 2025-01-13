import { NextRequest, NextResponse } from 'next/server';

const privatePaths = ['/user/profile', '/user/password', '/user/purchase'];

const unAuthPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }
    if (refreshToken) {
        if (unAuthPaths.some((path) => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL(`/`, request.url));
        }
    }
}

export const config = {
    matcher: '/:path*',
};
