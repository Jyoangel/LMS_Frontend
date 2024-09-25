"use client"

import { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { format } from "date-fns";
import { fetchAttendanceByStudentId } from "../../../../../../api/attendanceapi"; // api to fetch attendance using studenID 

export default function StudentAtdDetails({ params }) {
    const { studentId } = params;
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch attendance data using attendance data 
                const data = await fetchAttendanceByStudentId(studentId);
                setAttendanceData(data[0]);  // Assuming data[0] is the correct format

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);

    // Convert dates array into an object with dates as keys
    const attendanceMap = (attendanceData?.dates || []).reduce((map, entry) => {
        const dateString = format(new Date(entry.date), "yyyy-MM-dd");
        map[dateString] = entry.present ? 'Present' : 'Absent';
        return map;
    }, {});

    const dateCellRender = (value) => {
        const dateString = format(value.toDate(), "yyyy-MM-dd");
        if (attendanceMap[dateString]) {
            return (
                <Badge status={attendanceMap[dateString] === 'Present' ? 'success' : 'default'} text={attendanceMap[dateString]} />
            );
        }
        return null;
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    return (
        <>
            <div className="h-auto w-full flex flex-col p-5 gap-10">
                {/* buttons */}
                <div className="flex w-full justify-between items-center">
                    <Link href={"/teacherspanel/Attendance"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                    <div className="flex gap-3 items-center justify-center">
                        <div className="flex items-center justify-center gap-1">
                            <button className="text-blue-400 text-lg font-medium">
                                Edit
                            </button>{" "}
                            <h1 className="text-gray-300 ">|</h1>
                            <button className="text-red-500 text-lg font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {/* student details */}
                <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
                    <div className="w-full h-12 px-5 flex items-center bg-blue-200">
                        <h1 className="text-blue-600 font-semibold ">
                            {attendanceData?.studentId?.name}
                        </h1>
                    </div>

                    <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg py-5">
                        {/* student name */}
                        <div className="flex flex-col gap-5 w-full">
                            <h1 className="text-black font-bold text-lg">Student Details</h1>

                            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                                {/* Form Number */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Form Number
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.formNumber}
                                    </h1>
                                </div>

                                {/* Admission Number */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Admission Number
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.admissionNumber}
                                    </h1>
                                </div>

                                {/* Name */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.name}
                                    </h1>
                                </div>

                                {/* Class */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.class}
                                    </h1>
                                </div>

                                {/* Date of Birth */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Date of Birth
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.dateOfBirth ? format(new Date(attendanceData.studentId.dateOfBirth), "yyyy-MM-dd") : "N/A"}
                                    </h1>
                                </div>

                                {/* Gender */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.gender}
                                    </h1>
                                </div>

                                {/* Nationality */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Nationality
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.nationality}
                                    </h1>
                                </div>

                                {/* Mother Tongue */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Mother Tongue
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.motherTongue}
                                    </h1>
                                </div>

                                {/* Religion */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Religion
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.religion}
                                    </h1>
                                </div>

                                {/* Caste */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">Caste</h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.caste}
                                    </h1>
                                </div>

                                {/* Blood Group */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Blood Group
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.bloodGroup}
                                    </h1>
                                </div>

                                {/* Aadhar Number */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Aadhar Number
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.aadharNumber}
                                    </h1>
                                </div>

                                {/* Contact Number */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Contact Number
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.contactNumber}
                                    </h1>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-gray-400 font-normal text-lg">Address </h1>
                                <h1 className="text-black font-bold text-lg">
                                    {attendanceData?.studentId?.address}
                                </h1>
                            </div>

                            {/* Parent Details */}
                            <h1 className="text-black font-bold text-lg">Parent Details</h1>

                            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                                {/* Father Name */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Father Name
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.parent.fatherName}
                                    </h1>
                                </div>

                                {/* Father Occupation */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Father Occupation
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.parent.fatherOccupation}
                                    </h1>
                                </div>

                                {/* Father Contact */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Father Contact
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.parent.fatherContactNumber}
                                    </h1>
                                </div>

                                {/* Mother Name */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Mother Name
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.parent.motherName}
                                    </h1>
                                </div>

                                {/* Mother Occupation */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Mother Occupation
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.parent.motherOccupation}
                                    </h1>
                                </div>

                                {/* Mother Contact */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Mother Contact
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.parent.motherContactNumber}
                                    </h1>
                                </div>
                            </div>

                            {/* Local Guardian Details */}
                            <h1 className="text-black font-bold text-lg">Local Guardian Details</h1>

                            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                                {/* Guardian Name */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Guardian Name
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.localGuardian.guardianName}
                                    </h1>
                                </div>

                                {/* Guardian Occupation */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Guardian Occupation
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.localGuardian.guardianOccupation}
                                    </h1>
                                </div>

                                {/* Guardian Contact */}
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-gray-400 font-normal text-lg">
                                        Guardian Contact
                                    </h1>
                                    <h1 className="text-black font-bold text-lg">
                                        {attendanceData?.studentId?.localGuardian.guardianContactNumber}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="flex flex-col gap-5 w-full">
                            <h1 className="text-black font-bold text-lg">Attendance Calendar</h1>
                            <Calendar dateCellRender={dateCellRender} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
