"use client";
import { useState, useEffect } from 'react';

import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { updateStudentData, fetchStudentById } from "../../../../../../api/api"; // update anf fetch specific student api 

export default function UpdateDetails({ params }) {

    const { studentID } = params;
    const [formData, setFormData] = useState({
        studentID: '',
        formNumber: '',
        admissionNumber: '',
        name: '',
        class: '',
        admissionType: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        motherTongue: '',
        religion: '',
        caste: '',
        bloodGroup: '',
        aadharNumber: '',
        contactNumber: '',
        email: '',
        address: '',
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
            parentAddress: '',
        },
        localGuardian: {
            guardianName: '',
            relationWithStudent: '',
            guardianContactNumber: '',
            guardianAadharNumber: '',
            guardianOccupation: '',
            guardianAddress: '',
        },
    });
    const [isSelectOpen, setisSelectOpen] = useState(false);
    // call api o fetch initaial data in form 
    useEffect(() => {
        async function fetchData() {
            try {
                const studentData = await fetchStudentById(studentID);
                if (studentData) {
                    // Format dateOfBirth to "yyyy-MM-dd" if it's a valid date
                    if (studentData.dateOfBirth) {
                        const formattedDate = new Date(studentData.dateOfBirth)
                            .toISOString()
                            .split("T")[0];
                        studentData.dateOfBirth = formattedDate;
                    }
                    setFormData(studentData);
                }
            } catch (error) {
                console.error("Failed to fetch student data:", error);
            }
        }

        fetchData();
    }, [studentID]);


    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleParentChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            parent: {
                ...formData.parent,
                [name]: value,
            },
        });
    };

    const handleLocalGuardianChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            localGuardian: {
                ...formData.localGuardian,
                [name]: value,
            },
        });
    };

    // handle submit and update student 

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Perform update operation using formData and studentID
            await updateStudentData(studentID, formData);
            openModal(); // Optionally open a modal upon successful update
        } catch (error) {
            console.error('Failed to update student data:', error.message);
        }
    };


    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/UserManagement/"}>
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>


                <form className="flex flex-col gap-10" onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-8">
                        <h1 className="text-lg font-semibold">Student Details</h1>
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Student ID*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    readOnly
                                    name="studentID"
                                    value={formData.studentID}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Form Number*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="formNumber"
                                    value={formData.formNumber}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Admission Number**/}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Admission Number*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="admissionNumber"
                                    value={formData.admissionNumber}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Name*/}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Name*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Class */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Class*</label>
                                <select
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400">
                                        Select
                                    </option>
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Admission Type*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="admissionType"
                                    value={formData.admissionType}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Date of Birth*
                                </label>
                                <input
                                    type="date"
                                    placeholder="Type here"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Gender*</label>
                                <select
                                    type="text"
                                    placeholder="Type here"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400 px">
                                        Select
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Nationality */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Nationality*</label>
                                <select
                                    type="text"
                                    placeholder="Type here"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400 px">
                                        Select
                                    </option>
                                    <option value="Indian">Indian</option>
                                    <option value="American">American</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>


                            {/* Mother Tongue */}
                            {/* Mother Tongue */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Mother Tongue*
                                </label>
                                <select
                                    type="text"
                                    placeholder="Type here"
                                    name="motherTongue"
                                    value={formData.motherTongue}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400 px">
                                        Select
                                    </option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Religion */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Religion*</label>
                                <select
                                    type="text"
                                    placeholder="Type here"
                                    name="religion"
                                    value={formData.religion}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400 px">
                                        Select
                                    </option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Caste */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Caste*</label>
                                <select
                                    type="text"
                                    placeholder="Type here"
                                    name="caste"
                                    value={formData.caste}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400 px">
                                        Select
                                    </option>
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                </select>
                            </div>

                            {/* Blood Group */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Blood Group*
                                </label>
                                <select
                                    type="text"
                                    placeholder="Type here"
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400 px">
                                        Select
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="B+">B+</option>
                                    <option value="O+">O+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="A-">A-</option>
                                    <option value="B-">B-</option>
                                    <option value="O-">O-</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>

                            {/* Aadhar Number */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Aadhar Number*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="aadharNumber"
                                    value={formData.aadharNumber}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Contact Number*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Email*</label>
                                <input
                                    type="email"
                                    placeholder="Type here"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-3 w-full col-span-3">
                        <label className="text-lg font-normal text-black">Address*</label>
                        <textarea
                            type="text"
                            placeholder="Type here"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>


                    {/* Parent's Details */}
                    <div className="flex flex-col gap-8">
                        <h1 className="text-lg font-semibold">Parent&apos;s Details</h1>
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Father&apos;s Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="fatherName"
                                    value={formData.parent.fatherName}
                                    onChange={handleParentChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Father Contact Number */}
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
                    </div>

                    {/* Local Guardian Details */}
                    <div className="flex flex-col gap-8">
                        <h1 className="text-lg font-semibold">Local Guardian Details</h1>
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            {/* Guardian Name */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Guardian Name*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="guardianName"
                                    value={formData.localGuardian.guardianName}
                                    onChange={handleLocalGuardianChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Relation With Student */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Relation With Student*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="relationWithStudent"
                                    value={formData.localGuardian.relationWithStudent}
                                    onChange={handleLocalGuardianChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Contact Number*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="guardianContactNumber"
                                    value={formData.localGuardian.guardianContactNumber}
                                    onChange={handleLocalGuardianChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Aadhar Number */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Aadhar Number*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="guardianAadharNumber"
                                    value={formData.localGuardian.guardianAadharNumber}
                                    onChange={handleLocalGuardianChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Occupation */}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Occupation*</label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="guardianOccupation"
                                    value={formData.localGuardian.guardianOccupation}
                                    onChange={handleLocalGuardianChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-3 w-full">
                        <label className="text-lg font-normal text-black">Address *</label>
                        <textarea
                            type="text"
                            placeholder="Type here"
                            name="guardianAddress"
                            value={formData.localGuardian.guardianAddress}
                            onChange={handleLocalGuardianChange}
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex gap-5 pb-10">
                        <button
                            type="submit"

                            className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
                        >
                            Submit
                        </button>
                        <button type="button" className="w-44 text-black border border-gray-400 font-medium text-lg p-2">
                            Cancel
                        </button>
                    </div>
                    {isSelectOpen && (
                        <Successcard onClose={closeModal} para={"Student updated successfully!"} url={"/AdminDashboard/UserManagement"} />
                    )}
                </form>
            </div>
        </>
    );
}
