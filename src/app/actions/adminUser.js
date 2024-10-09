// app/action/adminUser.js

import { connectDB } from "@/utils/database"; // Replace with your actual database connection utility
import AdminUser from '../../Models/AdminUser'; // Replace with your AdminUser schema

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { userId, name, email, roles, picture } = req.body;

            await connectDB(); // Connect to your MongoDB

            // Check if the admin user already exists
            let adminUser = await AdminUser.findOne({ userId });

            if (!adminUser) {
                // Create a new admin user
                adminUser = new AdminUser({
                    userId,
                    name,
                    email,
                    roles,
                    picture, // Save the picture URL
                });

                await adminUser.save();
            }

            res.status(200).json({ message: 'Admin user saved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving admin user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
