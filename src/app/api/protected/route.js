import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    return new Response(
        JSON.stringify({ protected: 'My Secret', id: user.sub }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    );
});
