

import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req) {
    try {
        const session = await getSession(req);

        if (!session || !session.user) {
            console.log("No session found after login");
            return NextResponse.redirect('/');
        }

        const user = session.user;
        console.log(user);
        const roles = user['https://chic-swan-0387d3.netlify.app/roles']; // Replace with the correct claim for roles from your Auth0 settings
        console.log(roles);

        // Redirect based on the user's role
        if (roles.includes('Admin')) {
            return NextResponse.redirect(`${req.nextUrl.origin}/AdminDashboard`);
        } else if (roles.includes('Teacher')) {
            return NextResponse.redirect(`${req.nextUrl.origin}/teacherspanel`);
        } else if (roles.includes('Student')) {
            return NextResponse.redirect(`${req.nextUrl.origin}/StudentPanel`);
        }
        else {
            //return NextResponse.redirect('/');
            return NextResponse.redirect(`${req.nextUrl.origin}/`);

        }
    } catch (error) {
        console.error("Error during post-login redirection:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
