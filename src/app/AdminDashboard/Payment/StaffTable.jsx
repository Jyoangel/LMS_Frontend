"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStaffData } from "../../../../api/staffapi";// fetch staff api
import { format } from "date-fns";
import Payment from "./StaffPayment/[staffId]/page";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function StaffPaymentTable({ filter, searchTerm }) {
    const [data, setData] = useState({ staff: [] });
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, error: authError, isLoading: userLoading } = useUser();

    const openNotice = (staffId) => {
        setSelectedStaffId(staffId);
        setIsNoticeOpen(true);
    };

    const closeNotice = () => {
        setIsNoticeOpen(false);
    };



    const loadItems = async () => {
        try {

            // call api to fetch staff data 
            const data = await fetchStaffData(user.sub);
            setData(data);
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

    const filteredData = data.staff.filter(
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
                            <th className="py-4 px-6 text-left">Staff Id</th>
                            <th className="py-4 px-6 text-left">Name</th>
                            <th className="py-4 px-6 text-left">Email</th>
                            <th className="py-4 px-6 text-left">DOB</th>
                            <th className="py-4 px-6 text-left">Gender</th>
                            <th className="py-4 px-6 text-left">Aadhar No</th>
                            <th className="py-4 px-6 text-left">Position</th>
                            <th className="py-4 px-6 text-left">Salary</th>
                            <th className="py-4 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {/* The .map() function iterates through filteredData and renders a <tr> (table row) for each staff item. */}
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    }`}
                            >
                                <td className="py-4 px-6 text-left">{index + 1}</td>
                                <td className="py-4 px-6 text-left">{item.staffID}</td>
                                <td className="py-4 px-6 text-left text-blue-600 underline">
                                    <Link href={`/AdminDashboard/Fees/FeeDetails/`}>{item.name}</Link>
                                </td>
                                <td className="py-4 px-6 text-left">{item.email}</td>
                                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                                <td className="py-4 px-6 text-left">{item.gender}</td>
                                <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                                <td className="py-4 px-6 text-left">{item.position}</td>
                                <td className="py-4 px-6 text-left">{item.salary}</td>
                                <td>
                                    <button onClick={() => openNotice(item._id)} className="py-4 px-6 text-left text-blue-500 underline">
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isNoticeOpen && <Payment staffId={selectedStaffId} onClose={closeNotice} />}

        </>
    );
}

{/*
import { useState, useEffect } from "react";
import PaymentEdit from "./StaffPayment/[StaffId]/page";
import { fetchPaymentStaffData } from "../../../../api/staffapi";

export default function StaffPaymentTable({ filter, searchTerm }) {
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openNotice = () => {
        setIsNoticeOpen(true);
    };

    const closeNotice = () => {
        setIsNoticeOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPaymentStaffData();
                const formattedData = data.payments.map((payment, index) => ({
                    srNo: index + 1,
                    name: payment.staff.name,
                    education: payment.staff.education,
                    aadharNo: payment.staff.aadharNumber,
                    position: payment.staff.position,
                    contactNo: payment.staff.contactNumber,
                    employmentType: payment.staff.employmentType,
                    salary: `₹${payment.salary}`,
                    status: payment.status, // Adjust if needed
                    action: "Pay",
                }));
                setPaymentData(formattedData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = paymentData.filter(
        (item) =>
            (filter === "" || item.assignClass === filter) &&
            (searchTerm === "" ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="w-full">
                <table className="w-full bg-white">
                    <thead className="bg-blue-200 h-14 py-10">
                        <tr className="text-gray-700 text-sm font-normal leading-normal">
                            <th className="py-4 px-6 text-left">Sr. No</th>
                            <th className="py-4 px-6 text-left">Name</th>
                            <th className="py-4 px-6 text-left">Education</th>
                            <th className="py-4 px-6 text-left">Aadhar No</th>
                            <th className="py-4 px-6 text-left">Position</th>
                            <th className="py-4 px-6 text-left">Contact No</th>
                            <th className="py-4 px-6 text-left">Employment TYpe</th>
                            <th className="py-4 px-6 text-left">Salary</th>
                            <th className="py-4 px-6 text-left">Status</th>
                            <th className="py-4 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    }`}
                            >
                                <td className="py-4 px-6 text-left">{item.srNo}</td>
                                <td className="py-4 px-6 text-left">{item.name}</td>
                                <td className="py-4 px-6 text-left">{item.education}</td>
                                <td className="py-4 px-6 text-left">{item.aadharNo}</td>
                                <td className="py-4 px-6 text-left">{item.position}</td>
                                <td className="py-4 px-6 text-left">{item.contactNo}</td>
                                <td className="py-4 px-6 text-left">{item.employmentType}</td>
                                <td className="py-4 px-6 text-left">{item.salary}</td>
                                <td className={`py-4 px-6 text-left text-orange-400 underline`}>
                                    {item.status}
                                </td>
                                <td>
                                    <button onClick={openNotice} className="py-4 px-6 text-left text-blue-500 underline">
                                        {item.action}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isNoticeOpen && <PaymentEdit onClose={closeNotice} />}
        </>
    );
}
    */}
