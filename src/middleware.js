// import { NextResponse } from 'next/server';
// import { getSession } from '@auth0/nextjs-auth0';

// export async function middleware(req) {
//     const session = await getSession(req, NextResponse.next());

//     // If there is no session, redirect to the login page
//     if (!session) {
//         const url = new URL('/api/auth/login', req.url);
//         url.searchParams.set('returnTo', req.nextUrl.pathname);
//         return NextResponse.redirect(url);
//     }

//     // If there is a session, allow the request to continue
//     return NextResponse.next();
// }

// // Specify which paths to protect
// export const config = {
//     matcher: ['/protected/(.*)', "/StudentPanel/:path*"],
// };
// middleware.js
import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function middleware(req) {
    const session = await getSession(req, res);

    if (!session || !session.user) {
        // Redirect the user to the login page if they are not authenticated
        return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }

    return NextResponse.next(); // Continue to the requested page if authenticated
}

// Apply middleware to all routes
export const config = {
    matcher: ["/profile/:path*"], // Adjust this to the routes you want to protect
};

{/*

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // For verifying JWT tokens (if using JWT)

export async function middleware(req) {
    // Access cookies directly from the request
    const sessionToken = req.cookies.get('appSession'); // Replace 'appSession' with your Auth0 session cookie name

    // If the user is not logged in (no session), redirect to the login page
    if (!sessionToken) {
        return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }

    // If you are using JWT for roles, decode the token here
    try {
        const { payload } = await jwtVerify(sessionToken.value, new TextEncoder().encode('your-secret-key')); // Replace with your JWT secret
        const userRole = payload.role || 'Guest'; // Assuming the role is in the JWT payload

        const url = req.nextUrl.pathname;

        // Role-based route protection
        if (url.startsWith('/AdminDashboard') && userRole !== 'Admin') {
            return NextResponse.redirect(new URL('/api/auth/login', req.url)); // Redirect to login page
        }

        if (url.startsWith('/teachersPanel') && userRole !== 'Teacher') {
            return NextResponse.redirect(new URL('/api/auth/login', req.url)); // Redirect to login page
        }

        if (url.startsWith('/StudentPanel') && userRole !== 'Student') {
            return NextResponse.redirect(new URL('/api/auth/login', req.url)); // Redirect to login page
        }
    } catch (err) {
        // If token verification fails, redirect to login
        return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }

    return NextResponse.next(); // Allow the request if no redirect was made
}

// Specify the paths that should be protected by this middleware
export const config = {
    matcher: ['/AdminDashboard/:path*', '/teachersPanel/:path*', '/StudentPanel/:path*'],
};


{/*
    import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function middleware(req) {
    const session = await getSession(req);

    // If the user is not logged in, redirect to the login page
    if (!session) {
        return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }

    const userRole = session.user?.role || 'Guest'; // Assuming you store roles in the session

    const url = req.nextUrl.pathname;

    // Role-based route protection
    if (url.startsWith('/AdminDashboard') && userRole !== 'Admin') {
        return NextResponse.redirect(new URL('/403', req.url)); // Redirect to forbidden page
    }

    if (url.startsWith('/teachersPanel') && userRole !== 'Teacher') {
        return NextResponse.redirect(new URL('/403', req.url)); // Redirect to forbidden page
    }

    if (url.startsWith('/StudentPanel') && userRole !== 'Student') {
        return NextResponse.redirect(new URL('/403', req.url)); // Redirect to forbidden page
    }

    return NextResponse.next(); // Allow the request
}

// Specify the paths that should be protected by this middleware
export const config = {
    matcher: ['/AdminDashboard/:path*', '/teachersPanel/:path*', '/StudentPanel/:path*'],
};



{/*
*/}
