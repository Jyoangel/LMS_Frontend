'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function UsersPage() {
    const { user, error: userError, isLoading: userLoading } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/api/fetchUsers');
                console.log('Fetched Users:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading || userLoading) return <div>Loading...</div>;
    if (error || userError) return <div>{error || userError.message}</div>;

    // Filter out the logged-in user
    const filteredUsers = users.filter(fetchedUser => fetchedUser.user_id !== user.sub);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {filteredUsers.map(fetchedUser => (
                    <li key={fetchedUser.user_id}>{fetchedUser.name || fetchedUser.email}</li>
                ))}
            </ul>
        </div>
    );
}
