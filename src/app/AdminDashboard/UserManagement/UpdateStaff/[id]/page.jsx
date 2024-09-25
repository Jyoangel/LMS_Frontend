"use client"

import React, { useState, useEffect } from 'react';
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchStaffById, updateStaffData } from '../../../../../../api/staffapi'; // fetch and update specific staff api  

const StaffDetail = ({ params }) => {
    const { id } = params
    const [isSelectOpen, setisSelectOpen] = useState(false);

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const initialFormData = {
        staffID: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        email: '',
        education: '',
        address: '',
        aadharNumber: '',
        position: '',
        employmentType: '',
        emergencyContact: {
            contactNumber: '',
            relationship: ''
        },
        nationality: '',
        languageSpoken: '',
        salary: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    // call fetch api for intial data 
    useEffect(() => {
        async function fetchData() {
            try {
                const staffData = await fetchStaffById(id);
                if (staffData) {
                    setFormData(staffData);
                }
            } catch (error) {
                console.error('Failed to fetch staff data:', error);
            }
        }

        fetchData();
    }, [id]);


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

    //  update staff 
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Perform update operation using formData and studentID
            await updateStaffData(id, formData);
            openModal(); // Optionally open a modal upon successful update
        } catch (error) {
            console.error('Failed to update student data:', error.message);
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

            <form onSubmit={handleUpdate} className="flex flex-col gap-10">
                <div className="flex flex-col gap-8">
                    <h1 className="text-lg font-semibold">Staff Details</h1>
                    <div className="w-full grid grid-cols-3 items-center gap-5">

                        {/* Staff ID */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="staffID" className="text-lg font-normal text-black">Staff ID*</label>
                            <input
                                id="staffID"
                                type="text"
                                placeholder="Type here"
                                name="staffID"
                                value={formData.staffID}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Name */}
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

                        {/* Date of Birth */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="dateOfBirth" className="text-lg font-normal text-black">Date of Birth*</label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Gender */}
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

                        {/* Contact Number */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="contactNumber" className="text-lg font-normal text-black">Contact Number*</label>
                            <input
                                id="contactNumber"
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="email" className="text-lg font-normal text-black">Email*</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Education */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="education" className="text-lg font-normal text-black">Education*</label>
                            <input
                                id="education"
                                type="text"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="address" className="text-lg font-normal text-black">Address*</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Aadhar Number */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="aadharNumber" className="text-lg font-normal text-black">Aadhar Number*</label>
                            <input
                                id="aadharNumber"
                                type="text"
                                name="aadharNumber"
                                value={formData.aadharNumber}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Position */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="position" className="text-lg font-normal text-black">Position*</label>
                            <input
                                id="position"
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="employmentType" className="text-lg font-normal text-black">Employment Type*</label>
                            <input
                                id="employmentType"
                                type="text"
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Emergency Contact Number */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="emergencyContactNumber" className="text-lg font-normal text-black">Emergency Contact Number*</label>
                            <input
                                id="emergencyContactNumber"
                                type="text"
                                name="contactNumber"
                                value={formData.emergencyContact.contactNumber}
                                onChange={handleEmergencyContactChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Emergency Contact Relationship */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="relationship" className="text-lg font-normal text-black">Emergency Contact Relationship*</label>
                            <input
                                id="relationship"
                                type="text"
                                name="relationship"
                                value={formData.emergencyContact.relationship}
                                onChange={handleEmergencyContactChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Nationality */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="nationality" className="text-lg font-normal text-black">Nationality*</label>
                            <input
                                id="nationality"
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Language Spoken */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="languageSpoken" className="text-lg font-normal text-black">Language Spoken*</label>
                            <input
                                id="languageSpoken"
                                type="text"
                                name="languageSpoken"
                                value={formData.languageSpoken}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Salary */}
                        <div className="flex flex-col gap-3 w-full">
                            <label htmlFor="salary" className="text-lg font-normal text-black">Salary*</label>
                            <input
                                id="salary"
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end w-full">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Success Modal */}
            {isSelectOpen && (
                <Successcard onClose={closeModal} para={"Staff updated successfully!"} url={"/AdminDashboard/UserManagement"} />
            )}
        </div>
    );
};

export default StaffDetail;
