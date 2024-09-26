// app/api/auth/[auth0]/route.js

// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

// Define the main handler
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    switch (action) {
        case 'login':
            return handleLogin({
                returnTo: '/post-login', // Redirect after login
            })(req);

        case 'signup':
            return handleLogin({
                authorizationParams: {
                    screen_hint: 'signup',
                },
                returnTo: '/post-login', // Redirect after signup
            })(req);

        case 'logout':
            return handleLogout({
                returnTo: '/', // Redirect to homepage after logout
            })(req);

        case 'callback':
            return handleCallback()(req); // Handle callback

        default:
            return handleAuth()(req); // Fallback to the default Auth0 handler
    }
};

// import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';


// export const GET = handleAuth({

//     login: handleLogin({
//         returnTo: '/post-login',
//     }),
//     signup: handleLogin({
//         authorizationParams: {
//             screen_hint: 'signup',
//         },
//         returnTo: '/post-login', // Redirect after signup
//     }),
//     logout: handleLogout({
//         returnTo: '/', // Redirect to homepage after logout
//     }),
// });





// import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

// export const GET = handleAuth({
//     login: handleLogin({
//         returnTo: '/AdminDashboard',
//     }),
//     signup: handleLogin({
//         authorizationParams: {
//             screen_hint: 'signup',
//         },
//         returnTo: '/AdminDashboard',
//     }),
//     logout: handleLogout({
//         returnTo: '/', // Redirect to homepage after logout
//     }),
// });

{/*
import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/custom-callback', // Redirect to custom callback route
    }),
    signup: handleLogin({
        authorizationParams: {
            screen_hint: 'signup',
        },
        returnTo: '/', // Redirect to homepage after signup
    }),
    logout: handleLogout({
        returnTo: '/', // Redirect to homepage after logout
    }),
    callback: handleCallback() // Use default callback handler
});

*/}
