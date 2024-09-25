"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFeeRecordByMonth } from '../../../../../../../api/api'; // fetch fee api using month 

const Page = ({ params }) => {
    const { studentID } = params;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [feeRecords, setFeeRecords] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const feeDataByMonth = {};

                for (const month of months) {
                    try {
                        // fetch fee record using month and studentID
                        const feeData = await fetchFeeRecordByMonth(studentID, month);
                        feeDataByMonth[month] = feeData; // Store data if found
                    } catch (error) {
                        feeDataByMonth[month] = null; // If no data, mark it as null
                    }
                }

                setFeeRecords(feeDataByMonth);
            } catch (error) {
                console.error('Error fetching fee records:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-8">
            {/* selcet the month whose fee Record is present  */}
            <h1 className="text-2xl font-bold mb-4">Select a Month</h1>
            <div className="grid grid-cols-3 gap-4">
                {months.map((month, index) => (
                    <div key={index}>
                        {feeRecords[month] ? (
                            <Link href={`/AdminDashboard/Fees/Component/EditFees/EditMonthFee/${studentID}/${month}`}>
                                <div className="block p-4 border rounded-lg shadow-md bg-blue-100 hover:bg-blue-200 text-center">
                                    {month}
                                </div>
                            </Link>
                        ) : (
                            <div className="block p-4 border rounded-lg shadow-md bg-gray-100 text-center text-gray-500">
                                {month} (No Record)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
