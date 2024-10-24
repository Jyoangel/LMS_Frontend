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

export async function fetchAdminUserByUserId(userId) {
    //const encodedUserId = encodeURIComponent(userId); // Encode the userId to handle special characters
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${userId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');

            // If the content is not JSON, log the full response as text for debugging
            if (!contentType || !contentType.includes('application/json')) {
                const errorText = await response.text(); // Capture the response as text (HTML or other)
                console.error('Non-JSON response received:', errorText);
                throw new Error('Received non-JSON response from server');
            }

            // If JSON, parse the error response and throw it
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch admin user');
        }

        // If everything is fine, parse and return the JSON data
        const adminUserData = await response.json();
        return adminUserData;
    } catch (error) {
        console.error('Error fetching admin user:', error);
        throw error;
    }
}


