export const fetchAdminUser = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch admin users');
        }

        const adminUsers = await response.json();
        return adminUsers; // Return the fetched list of admin users
    } catch (error) {
        console.error('Error fetching admin users:', error);
        return []; // Return an empty array or handle the error as needed
    }
};