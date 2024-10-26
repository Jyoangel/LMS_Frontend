"use client"
import React from 'react'
import { useState, useEffect } from "react";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { fetchAdmitCardById, updateAdmitCardData } from "../../../../../../api/reportcardapi";// fetch and update api for specific admit card 

function EditAdmitCard({ params }) {

    const { id } = params;

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        examination_roll_number: "",
        school_name: "",

        examination: "",

        startdate: "",
        enddate: "",
        examstarting_time: "",
        examending_time: "",
        examsubjects: [{ subject: "", examination_date: "" }],
    });

    useEffect(() => {
        // Fetch initial admit card data if id is available in router.query
        if (id) {
            fetchInitialData(id);
        }
    }, [id]); // Re-fetch data whenever id changes

    const fetchInitialData = async (id) => {
        try {
            const data = await fetchAdmitCardById(id);

            // Format startdate and enddate if they are valid dates
            if (data.startdate) {
                data.startdate = new Date(data.startdate).toISOString().split("T")[0];
            }
            if (data.enddate) {
                data.enddate = new Date(data.enddate).toISOString().split("T")[0];
            }

            // Format each examination_date in examsubjects
            if (data.examsubjects && Array.isArray(data.examsubjects)) {
                data.examsubjects = data.examsubjects.map((subject) => ({
                    ...subject,
                    examination_date: subject.examination_date
                        ? new Date(subject.examination_date).toISOString().split("T")[0]
                        : ""
                }));
            }

            setFormData(data); // Set formatted data into formData state
        } catch (error) {
            console.error("Failed to fetch admit card data:", error.message);
            // Handle error or display an error message
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubjectChange = (index, e) => {
        const { name, value } = e.target;
        const newSubjects = [...formData.examsubjects];
        newSubjects[index] = { ...newSubjects[index], [name]: value };
        setFormData((prevData) => ({
            ...prevData,
            examsubjects: newSubjects,
        }));
    };

    const addSubjectField = () => {
        setFormData((prevData) => ({
            ...prevData,
            examsubjects: [...prevData.examsubjects, { subject: "", examination_date: "" }],
        }));
    };
    // use to submit and update admit card data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateAdmitCardData(id, formData);
            console.log("Server Response:", result);
            setIsSelectOpen(true); // Open success modal on successful update
        } catch (error) {
            console.error("Failed to update admit card data:", error.message);
            // Handle error or display an error message
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href="/teacherspanel/ReportCard">
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeft className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10" data-testid="form">
                    {/* Student Details */}
                    <div className="flex flex-col gap-8">
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            {/* Examination Roll Number */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="examination_roll_number" className="text-lg font-normal text-black">
                                    Examination Roll No*
                                </label>
                                <input
                                    id="examination_roll_number"
                                    type="text"
                                    name="examination_roll_number"
                                    value={formData.examination_roll_number}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* School Name */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="school_name" className="text-lg font-normal text-black">
                                    School Name*
                                </label>
                                <input
                                    id="school_name"
                                    type="text"
                                    name="school_name"
                                    value={formData.school_name}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Session */}


                            {/* Examination */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="examination" className="text-lg font-normal text-black">
                                    Examination*
                                </label>
                                <input
                                    id="examination"
                                    type="text"
                                    name="examination"
                                    value={formData.examination}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>



                            {/* Start Date */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="startdate" className="text-lg font-normal text-black">
                                    Start Date*
                                </label>
                                <input
                                    id="startdate"
                                    type="date"
                                    name="startdate"
                                    value={formData.startdate}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="enddate" className="text-lg font-normal text-black">
                                    End Date*
                                </label>
                                <input
                                    id="enddate"
                                    type="date"
                                    name="enddate"
                                    value={formData.enddate}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Exam Starting Time */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="examstarting_time" className="text-lg font-normal text-black">
                                    Exam Starting Time*
                                </label>
                                <input
                                    id="examstarting_time"
                                    type="text"
                                    name="examstarting_time"
                                    value={formData.examstarting_time}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Exam Ending Time */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="examending_time" className="text-lg font-normal text-black">
                                    Exam Ending Time*
                                </label>
                                <input
                                    id="examending_time"
                                    type="text"
                                    name="examending_time"
                                    value={formData.examending_time}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                        </div>

                        <h1 className="text-black text-xl font-semibold">Add Exam Subject</h1>
                        {formData.examsubjects.map((subject, index) => (
                            <div key={index} className="w-full grid grid-cols-3 items-center gap-5">
                                {/* Subject */}
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor={`subject_${index}`} className="text-lg font-normal text-black">Subject*</label>
                                    <input
                                        id={`subject_${index}`}
                                        type="text"
                                        name="subject"
                                        value={subject.subject}
                                        onChange={(e) => handleSubjectChange(index, e)}
                                        placeholder="Type here"
                                        className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    />
                                </div>

                                {/* Examination Date */}
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor={`examination_date_${index}`} className="text-lg font-normal text-black">
                                        Examination Date*
                                    </label>
                                    <input
                                        id={`examination_date_${index}`}
                                        type="date"
                                        name="examination_date"
                                        value={subject.examination_date}
                                        onChange={(e) => handleSubjectChange(index, e)}
                                        className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addSubjectField}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Add Subject
                        </button>
                    </div>

                    <div className="w-full flex justify-end">
                        <button
                            role="button"
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default EditAdmitCard;
