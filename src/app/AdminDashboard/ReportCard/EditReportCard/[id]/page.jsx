"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Successcard from "@/Components/Successcard";
import { fetchReportCardById, updateReportCardData } from "../../../../../../api/reportcardapi"; // api to fetch and update report card 

export default function EditReportCard({ params }) {
    const { id } = params; // Extract the id from params

    const [formData, setFormData] = useState({

        classTeacher: "",
        marks: {}, // Store marks for subjects
    });

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    useEffect(() => {
        if (id) {
            fetchReportCardData(id);
        }
    }, [id]);
    // use to fetch report card data 
    const fetchReportCardData = async (id) => {
        try {
            const data = await fetchReportCardById(id);
            setFormData(data);
        } catch (error) {
            console.error("Failed to fetch report card data:", error.message);
        }
    };

    const openModal = () => {
        setIsSelectOpen(true);
    };

    const closeModal = () => {
        setIsSelectOpen(false);
    };
    // handle submit and update report card data
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedData = await updateReportCardData(id, formData);
            console.log("Report card updated successfully:", updatedData);
            openModal();
        } catch (error) {
            console.error("Failed to update report card:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleMarksChange = (subjectName, e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            marks: {
                ...formData.marks,
                [subjectName]: value,
            },
        });
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href="/AdminDashboard/ReportCard">
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeft className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                    {/* Marks - Render dynamically based on subject names */}
                    {formData.subjects && formData.subjects.length > 0 ? (
                        formData.subjects.map((subject, index) => (
                            <div key={index} className="flex flex-col gap-3">
                                <label htmlFor={`marks-${index}`} className="text-lg font-normal text-black">
                                    {subject.subjectName} Marks*
                                </label>
                                <input
                                    id={`marks-${index}`}
                                    type="number"
                                    name={subject.subjectName}
                                    value={subject.marks || ""}
                                    onChange={(e) => handleMarksChange(subject.name, e)}
                                    className="border border-gray-300 rounded-md py-3 px-5 outline-none"
                                    required
                                />
                            </div>
                        ))
                    ) : (
                        <p>No subjects available</p> // Fallback if subjects are empty or not present
                    )}

                    {/* Class Teacher */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="classTeacher" className="text-lg font-normal text-black">
                            Class Teacher*
                        </label>
                        <input
                            id="classTeacher"
                            name="classTeacher"
                            type="text"
                            value={formData.classTeacher}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md py-3 px-5 outline-none"
                            placeholder="Type here"
                            required
                        />
                    </div>



                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            role="button"
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>

                {/* Success Modal */}
                {isSelectOpen && (
                    <Successcard
                        title="Report Card Updated Successfully!"
                        description="Your changes have been successfully saved."
                        handleClose={closeModal}
                        url={"/AdminDashboard/ReportCard"}
                    />
                )}
            </div>
        </>
    );
}
