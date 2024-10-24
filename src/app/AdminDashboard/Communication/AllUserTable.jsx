"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchAllData } from "../../../../api/api"; // Update to your actual API function
import { format } from "date-fns";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function AllUserTable({ filter, searchTerm }) {
    const [data, setData] = useState({ students: [], teachers: [], staff: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Get the authenticated user details from Auth0
    const { user, error: authError, isLoading: userLoading } = useUser();

    const loadItems = async () => {
        try {
            const result = await fetchAllData(user.sub);
            console.log(result); // Fetch students, teachers, and staff
            setData(result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userLoading && !authError) {
            loadItems(); // Load data only when user is authenticated
        }
    }, [user, userLoading, authError]); // Trigger loadItems when user is available

    if (userLoading) return <div>Loading...</div>; // Show loading indicator while fetching user details
    if (authError) return <div>{authError.message}</div>; // Handle authentication error

    // Combine all data into one array and add a type to each entry
    const combinedData = [
        ...data.students.map((item) => ({ ...item, type: "student" })),
        ...data.teachers.map((item) => ({ ...item, type: "teacher" })),
        ...data.staff.map((item) => ({ ...item, type: "staff" })),
    ];

    // Filter combined data based on the provided filter and search term
    const filteredData = combinedData.filter(
        (item) =>
            (filter === "" || item.class === filter) &&
            (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="w-full">
                <table className="w-full bg-white">
                    <thead className="bg-blue-200 h-14 py-10">
                        <tr className="text-gray-700 text-sm font-normal leading-normal">
                            <th className="py-4 px-6 text-left">Sr. No</th>

                            <th className="py-4 px-6 text-left">Name</th>
                            <th className="py-4 px-6 text-left">Role</th>

                            <th className="py-4 px-6 text-left">DOB</th>
                            <th className="py-4 px-6 text-left">Gender</th>
                            <th className="py-4 px-6 text-left">Aadhar No</th>
                            <th className="py-4 px-6 text-left">Father Name</th>
                            <th className="py-4 px-6 text-left">Contact No</th>
                            <th className="py-4 px-6 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    }`}
                            >
                                <td className="py-4 px-6 text-left">{index + 1}</td>

                                <td className="py-4 px-6 text-left">

                                    {item.name}

                                </td>
                                <td className="py-4 px-6 text-left">
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {/* Capitalize type */}
                                </td>

                                <td className="py-4 px-6 text-left">{item.dateOfBirth ? format(new Date(item.dateOfBirth), "yyyy-MM-dd") : "N/A"}</td>
                                <td className="py-4 px-6 text-left">{item.gender}</td>
                                <td className="py-4 px-6 text-left">{item.aadharNumber || "N/A"}</td>
                                <td className="py-4 px-6 text-left">{item.parent?.fatherName || "N/A"}</td>
                                <td className="py-4 px-6 text-left">{item.contactNumber}</td>
                                <td className="py-4 px-6 text-left">{item.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
