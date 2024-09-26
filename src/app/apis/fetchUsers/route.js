// src/app/api/fetchUsers/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

    try {
        // Log environment variables (except secret for security reasons)
        console.log('AUTH0_DOMAIN:', AUTH0_DOMAIN);
        console.log('AUTH0_CLIENT_ID:', AUTH0_CLIENT_ID);
        // Do not log AUTH0_CLIENT_SECRET for security reasons

        // Get access token
        const tokenResponse = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
            client_id: AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            audience: `https://${AUTH0_DOMAIN}/api/v2/`,
            grant_type: 'client_credentials',
        });

        const accessToken = tokenResponse.data.access_token;
        console.log('Access Token:', accessToken);

        // Fetch users
        const usersResponse = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Users Response:', usersResponse.data);

        return NextResponse.json(usersResponse.data);
    } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}
