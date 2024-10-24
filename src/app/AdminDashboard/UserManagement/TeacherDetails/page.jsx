"use client"

import React, { useState } from 'react';
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addTeacherData } from '../../../../../api/teacherapi'; // add teacher api
import { useUser } from '@auth0/nextjs-auth0/client';

const TeacherDetail = () => {
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const { user, error, isLoading } = useUser();


    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const initialFormData = {
        teacherID: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        email: '',
        aadharNumber: '',
        address: '',
        subjectTaught: '',
        assignedClass: '',
        gradeLevelTaught: '',
        department: '',
        highestDegreeEarned: '',
        instituteName: '',
        yearOfGraduation: '',
        emergencyContact: {
            contactNumber: '',
            relationship: ''
        },
        salary: '',
        parent: {
            fatherName: '',
            fatherContactNumber: '',
            fatherAadharNumber: '',
            fatherOccupation: '',
            motherName: '',
            motherContactNumber: '',
            motherAadharNumber: '',
            motherOccupation: '',
            annualIncome: '',
            parentAddress: ''
        },
        userId: user ? user.sub : '',


    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEmergencyContactChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            emergencyContact: {
                ...prevData.emergencyContact,
                [name]: value
            }
        }));
    };

    const handleParentChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            parent: {
                ...prevData.parent,
                [name]: value
            }
        }));
    };
    // handle submit and call the api to add taeacher data
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addTeacherData(formData);
            console.log('Teacher created successfully');
            // Reset form data
            setFormData(initialFormData);
            openModal();
            // You can add code here to refresh the teacher list in UserManagementTable if needed
        } catch (error) {
            console.error('Error creating teacher:', error);
            // Handle error (e.g., show error message)
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
            <div className="w-full">
                <Link href={"/AdminDashboard/UserManagement"}>
                    <button className="flex items-center justify-center gap-3">
                        <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                        <h1 className="text-lg font-semibold">Back</h1>
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="flex flex-col gap-8">
                    <h1 className="text-lg font-semibold">Teacher Details</h1>
                    <div className="w-full grid grid-cols-3 items-center gap-5">
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="teacherID" className="text-lg font-normal text-black">Teacher ID*</label>
                            <input
                                id="teacherID"
                                type="text"
                                placeholder="Type here"
                                name="teacherID"
                                value={formData.teacherID}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="name" className="text-lg font-normal text-black">Name*</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Type here"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="dateOfBirth" className="text-lg font-normal text-black">Date of Birth*</label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                placeholder="Type here"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="gender" className="text-lg font-normal text-black">Gender*</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="contactNumber" className="text-lg font-normal text-black">Contact Number*</label>
                            <input
                                id="contactNumber"
                                type="text"
                                placeholder="Type here"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="email" className="text-lg font-normal text-black">Email*</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Type here"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="aadharNumber" className="text-lg font-normal text-black">Aadhar Number*</label>
                            <input
                                id="aadharNumber"
                                type="text"
                                placeholder="Type here"
                                name="aadharNumber"
                                value={formData.aadharNumber}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="address" className="text-lg font-normal text-black">Address*</label>
                            <input
                                id="address"
                                type="text"
                                placeholder="Type here"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="subjectTaught" className="text-lg font-normal text-black">Subject Taught*</label>
                            <input
                                id="subjectTaught"
                                type="text"
                                placeholder="Type here"
                                name="subjectTaught"
                                value={formData.subjectTaught}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="assignedClass" className="text-lg font-normal text-black">Assigned Class*</label>
                            <input
                                id="assignedClass"
                                type="text"
                                placeholder="Type here"
                                name="assignedClass"
                                value={formData.assignedClass}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="gradeLevelTaught" className="text-lg font-normal text-black">Grade Level Taught*</label>
                            <input
                                id="gradeLevelTaught"
                                type="text"
                                placeholder="Type here"
                                name="gradeLevelTaught"
                                value={formData.gradeLevelTaught}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="department" className="text-lg font-normal text-black">Department*</label>
                            <input
                                id="department"
                                type="text"
                                placeholder="Type here"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="highestDegreeEarned" className="text-lg font-normal text-black">Highest Degree Earned*</label>
                            <input
                                id="highestDegreeEarned"
                                type="text"
                                placeholder="Type here"
                                name="highestDegreeEarned"
                                value={formData.highestDegreeEarned}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="instituteName" className="text-lg font-normal text-black">Institute Name*</label>
                            <input
                                id="instituteName"
                                type="text"
                                placeholder="Type here"
                                name="instituteName"
                                value={formData.instituteName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="yearOfGraduation" className="text-lg font-normal text-black">Year of Graduation*</label>
                            <input
                                id="yearOfGraduation"
                                type="text"
                                placeholder="Type here"
                                name="yearOfGraduation"
                                value={formData.yearOfGraduation}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Emergency Contact Section */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="emergencyContactNumber" className="text-lg font-normal text-black">Emergency Contact Number*</label>
                            <input
                                id="emergencyContactNumber"
                                type="text"
                                placeholder="Type here"
                                name="contactNumber"
                                value={formData.emergencyContact.contactNumber}
                                onChange={handleEmergencyContactChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="relationship" className="text-lg font-normal text-black">Relationship*</label>
                            <input
                                id="relationship"
                                type="text"
                                placeholder="Type here"
                                name="relationship"
                                value={formData.emergencyContact.relationship}
                                onChange={handleEmergencyContactChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="salary" className="text-lg font-normal text-black">Salary*</label>
                            <input
                                id="salary"
                                type="text"
                                placeholder="Type here"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Parent Information Section */}
                        <h1 className="text-lg font-semibold col-span-3">Parent Information</h1>

                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="fatherName" className="text-lg font-normal text-black">Father's Name*</label>
                            <input
                                id="fatherName"
                                type="text"
                                placeholder="Type here"
                                name="fatherName"
                                value={formData.parent.fatherName}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Father Contact Number*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="fatherContactNumber"
                                value={formData.parent.fatherContactNumber}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Father Aadhar Number */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Father Aadhar Number*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="fatherAadharNumber"
                                value={formData.parent.fatherAadharNumber}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Father Occupation */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Father Occupation*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="fatherOccupation"
                                value={formData.parent.fatherOccupation}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Mother Name */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Mother Name*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="motherName"
                                value={formData.parent.motherName}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Mother Contact Number */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Mother Contact Number*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="motherContactNumber"
                                value={formData.parent.motherContactNumber}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Mother Aadhar Number */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Mother Aadhar Number*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="motherAadharNumber"
                                value={formData.parent.motherAadharNumber}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Mother Occupation */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Mother Occupation*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="motherOccupation"
                                value={formData.parent.motherOccupation}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Annual Income */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Annual Income*
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="annualIncome"
                                value={formData.parent.annualIncome}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Parent Address */}
                        <div className="flex flex-col gap-3 w-full col-span-3">
                            <label className="text-lg font-normal text-black">
                                Parent Address*
                            </label>
                            <textarea
                                type="text"
                                placeholder="Type here"
                                name="parentAddress"
                                value={formData.parent.parentAddress}
                                onChange={handleParentChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-3 w-96">
                        Submit
                    </button>
                </div>
            </form>

            {/* Success Modal */}
            {isSelectOpen && (
                <Successcard onClose={closeModal} para={"Teacher added successfully!"} url={"/AdminDashboard/UserManagement"} />
            )}
        </div>
    );
};

export default TeacherDetail;
